import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.set("json spaces", 2);

type Service = {
  id: number;
  name: string;
  duration: number;
};

type Appointment = {
  id: string;
  name: string;
  serviceId: number;
  start: string;
  duration: number;
};

type UserAppointment = {
  id: string,
  serviceName: string,
  start: string,
  duration: string,
  customerName: string,
  make: string,
  model: string,
  year: string,
}

const services: Service[] = [
  {
    id: 1,
    name: "Synthetic Oil Change",
    duration: 1800,
  },
  {
    id: 2,
    name: "Brake Inspection",
    duration: 1800,
  },
  {
    id: 3,
    name: "Tire Rotation & Inspection",
    duration: 3600,
  },
  {
    id: 4,
    name: "Express Auto Detailing",
    duration: 5400,
  },
];

const getRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * max) + min;
};

const uuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const randomDate = () => {
  const start = new Date();
  const end = new Date(Date.now() + 12096e5);
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

let appointments: Appointment[] = [];
services.forEach((service) => {
  for (let i = 0; i < getRandom(2, 4); ++i) {
    appointments.push({
      id: uuid(),
      name: service.name,
      serviceId: service.id,
      start: randomDate().toISOString(),
      duration: service.duration,
    });
  }
});

app.get("/services", (_req, res) => res.send(services));

app.get("/appointments", (_req, res) => res.send(appointments));

app.get("/appointments/:serviceId", (req, res) => {
  if (Math.random() < 0.2) {
    res.status(500);
  } else {
    const serviceId = parseInt(req.params.serviceId);
    if (serviceId) {
      res.send(appointments.filter((appt) => appt.serviceId === serviceId));
    } else {
      res.status(400).send("invalid serviceId");
    }
  }
  res.end();
});

app.post("/appointments/:id", (req, res) => {
  const { email, customerName, modelYear, make, model } = req.body;
  if (!email) {
    res.status(400).send("invalid email address");
    res.end();
  } else if (!customerName) {
    res.status(400).send("invalid customer name");
    res.end();
  } else if (!modelYear || !make || !model) {
    res.status(400).send("invalid make/model/modelYear");
    res.end();
  }

  const appt = appointments.find((appt) => appt.id === req.params.id);
  if (appt) {
    res.send({
      id: uuid(),
      serviceName: appt.name,
      start: appt.start,
      duration: appt.duration,
      email,
      customerName,
      make,
      model,
      modelYear,
    });
  } else {
    res.status(400).send("invalid appointment id");
  }
  res.end();
});

app.listen(process.env.SERVERPORT || 2000, () => {
  console.log(
    `Scheduling server listening on port ${process.env.SERVERPORT || 2000}...`
  );
});

export type { Service, Appointment, UserAppointment };
