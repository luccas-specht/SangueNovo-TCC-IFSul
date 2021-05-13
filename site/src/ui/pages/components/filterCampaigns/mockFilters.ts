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
  { title: "até 2km", value: 2 },
  { title: "até 10km", value: 5 },
  { title: "até 50km", value: 50 },
];

export const goalInitial: ComboValue[] = [
  { title: "5L", value: "5L" },
  { title: "10L", value: "10L" },
  { title: "20L", value: "20L" },
];
