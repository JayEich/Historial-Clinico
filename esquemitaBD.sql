
-- Tabla: user

CREATE TABLE "user" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
);

-- Tabla: clinical_history

CREATE TABLE "clinical_history" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    diagnosis VARCHAR NOT NULL,
    treatment VARCHAR NOT NULL,
    "doctorNotes" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
    "patientId" UUID,
    CONSTRAINT fk_patient FOREIGN KEY ("patientId") REFERENCES "user"(id) ON DELETE CASCADE
);

-- Índices y restricciones adicionales

CREATE INDEX idx_clinical_history_patient ON "clinical_history"("patientId");
