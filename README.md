📝 Note for Evaluators

At the official submission deadline (5:00 PM), the repository encountered Git merge conflicts between the frontend and backend codebases. During the conflict resolution process, the main branch became inconsistent, which affected overall code stability and readability.

To ensure a clean, conflict-free, and fully functional submission, the repository was restructured shortly after the deadline. The conflicted main branch was removed, and a fresh main branch was created containing the complete, properly resolved frontend and backend code.

This restructuring was done strictly to improve clarity, maintainability, and correctness of the final submission.

👥 Team Members

Aditya Parmar — Final Year, Medi-Caps University

Gopala Joshi (Team Lead) — Final Year, Medi-Caps University

Karan Aswani — Final Year, Medi-Caps University

Khushboo Pandey — Final Year, Medi-Caps University

🗄️ Database Schema (Prisma + PostgreSQL)
Configuration
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

Enums
enum Role {
  admin
  manager
  technician
  employee
}

enum RequestType {
  Corrective
  Preventive
}

enum RequestStage {
  New
  InProgress
  Repaired
  Scrap
}

Models
model Company {
  id           Int                  @id @default(autoincrement())
  name         String
  users        User[]
  equipment    Equipment[]
  teams        Team[]
  workCenters  WorkCenter[]
  categories  EquipmentCategory[]
  requests     MaintenanceRequest[]
}

model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  role      Role     @default(employee)
  companyId Int
  company   Company  @relation(fields: [companyId], references: [id])

  teams              Team[]               @relation("TeamMembers")
  assignedTasks      MaintenanceRequest[] @relation("TechnicianTasks")
  defaultForEquipment Equipment[]          @relation("DefaultTech")

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Team {
  id        Int     @id @default(autoincrement())
  name      String
  companyId Int
  company   Company @relation(fields: [companyId], references: [id])

  members   User[]               @relation("TeamMembers")
  equipment Equipment[]
  requests  MaintenanceRequest[]
}

model EquipmentCategory {
  id        Int     @id @default(autoincrement())
  name      String
  companyId Int
  company   Company @relation(fields: [companyId], references: [id])

  equipment Equipment[]
}

model Equipment {
  id              Int     @id @default(autoincrement())
  name            String
  serialNumber    String  @unique
  companyId       Int
  company         Company @relation(fields: [companyId], references: [id])

  categoryId      Int
  category        EquipmentCategory @relation(fields: [categoryId], references: [id])

  maintenanceTeamId Int
  maintenanceTeam   Team @relation(fields: [maintenanceTeamId], references: [id])

  defaultTechId   Int
  defaultTech     User @relation("DefaultTech", fields: [defaultTechId], references: [id])

  isUsable Boolean @default(true)
  requests MaintenanceRequest[]
}

model WorkCenter {
  id          Int     @id @default(autoincrement())
  name        String
  code        String  @unique
  costPerHour Float
  capacity    Float
  oeeTarget   Float
  companyId   Int
  company     Company @relation(fields: [companyId], references: [id])

  requests MaintenanceRequest[]
}

model MaintenanceRequest {
  id            Int           @id @default(autoincrement())
  subject       String
  type          RequestType
  stage         RequestStage  @default(New)
  priority      Int           @default(1) // 1 = Low, 2 = Medium, 3 = High

  companyId     Int
  company       Company       @relation(fields: [companyId], references: [id])

  equipmentId   Int?
  equipment     Equipment?    @relation(fields: [equipmentId], references: [id])

  workCenterId  Int?
  workCenter    WorkCenter?   @relation(fields: [workCenterId], references: [id])

  teamId        Int
  team          Team          @relation(fields: [teamId], references: [id])

  technicianId  Int
  technician    User          @relation("TechnicianTasks", fields: [technicianId], references: [id])

  scheduledDate DateTime?
  duration      Int           @default(0)

  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
}
