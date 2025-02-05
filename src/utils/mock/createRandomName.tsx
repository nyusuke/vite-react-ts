import { faker } from "@faker-js/faker";

import type { NameType } from "src/types/name";

export function createRandomName(): NameType {
  const sex = faker.person.sexType();
  const firstName = faker.person.firstName(sex);
  const lastName = faker.person.lastName();

  return {
    id: faker.string.uuid(),
    name: lastName + " " + firstName,
    category: [faker.helpers.arrayElement(["Animal", "Book", "Car"])],
    createdAt: "2023-02-21T02:24:29.000Z",
    createdBy: "test_admin@example.com",
    updatedAt: "2023-02-21T02:24:29.000Z",
    updatedBy: "test_admin@example.com",
  };
}

export function createNames(num = 5): NameType[] {
  return Array.from({ length: num }, createRandomName);
}
