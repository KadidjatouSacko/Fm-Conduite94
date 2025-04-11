CREATE TABLE "contact" (
    "id" SERIAL PRIMARY KEY,
    "firstname" VARCHAR(100) NOT NULL,
    "lastname" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL UNIQUE,
    "phone" VARCHAR(20),  -- Champ optionnel, longueur modifiable selon les besoins
    "message" TEXT,
    "reason" VARCHAR(255),
    "file_path" VARCHAR(255),
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE formations (
    "id" SERIAL PRIMARY KEY,
    "nom" VARCHAR(255) NOT NULL,
    "tarif" DECIMAL(10, 2) NOT NULL,
    "description" TEXT NOT NULL,
    "documents" TEXT[],  -- Liste des documents nécessaires (journee d'appel, BSR, pièce d'identité, etc.)
    "public_cible" TEXT,  -- Qui est concerné par la formation
    "image_url" VARCHAR(255)  -- URL d'une image représentant la formation
);
