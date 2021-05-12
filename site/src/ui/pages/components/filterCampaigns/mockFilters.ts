import { ComboValue } from "../../../../models";

export const typeBloodInitial: ComboValue[] = [
  { title: "Tipo sanguíneo A+", value: "A+" },
  { title: "Tipo sanguíneo A-", value: "A-" },
  { title: "Tipo sanguíneo B+", value: "B+" },
  { title: "Tipo sanguíneo B-", value: "B-" },
  { title: "Tipo sanguíneo O+", value: "O+" },
  { title: "Tipo sanguíneo O-", value: "O-" },
  { title: "Tipo sanguíneo AB+", value: "AB+" },
  { title: "Tipo sanguíneo AB-", value: "AB-" },
];

export const priorityStatusInitial: ComboValue[] = [
  { title: "Baixa", value: "Baixa" },
  { title: "Média", value: "Média" },
  { title: "Alta", value: "Alta" },
];

export const distanceInitial: ComboValue[] = [
  { title: "até 5km", value: 5 },
  { title: "até 10km", value: 10 },
  { title: "até 25km", value: 25 },
  { title: "até 50km", value: 50 },
  { title: "100km ou mais", value: 100 },
];

export const goalInitial: ComboValue[] = [
  { title: "5L", value: "5L" },
  { title: "10L", value: "10L" },
  { title: "20L", value: "20L" },
];
