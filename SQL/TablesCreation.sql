DROP TABLE IF EXISTS Apoyos;
DROP TABLE IF EXISTS Eventos;
DROP TABLE IF EXISTS Proyectos;
DROP TABLE IF EXISTS Asesores;
DROP TABLE IF EXISTS Alumnos;
DROP TABLE IF EXISTS Participaciones;

CREATE TABLE Alumnos(
	IdAlumno INT PRIMARY KEY AUTO_INCREMENT,
    CorreoAlumno VARCHAR(45) NOT NULL,
    ContrasenaAlumno VARCHAR(45) NOT NULL,
    NombreAlumno VARCHAR(45) NOT NULL,
    ImagenAlumno VARCHAR(45)
);

CREATE TABLE Asesores(
	IdAsesor INT PRIMARY KEY AUTO_INCREMENT,
    CorreoAsesor VARCHAR(45) NOT NULL,
    ContrasenaAsesor VARCHAR(45) NOT NULL,
    NombreAsesor VARCHAR(45) NOT NULL,
    ImagenAsesor VARCHAR(45)
);

CREATE TABLE Proyectos(
	IdProyecto INT PRIMARY KEY AUTO_INCREMENT,
    NombreProyecto VARCHAR(45) NOT NULL,
    CategoriaProyecto VARCHAR(45) NOT NULL,
    DescripcionProyecto VARCHAR(45) NOT NULL
);

CREATE TABLE Eventos(
	IdEvento INT PRIMARY KEY AUTO_INCREMENT,
    NombreEvento VARCHAR(45) NOT NULL,
    FechaEvento DATE NOT NULL
);

CREATE TABLE Apoyos(
	IdApoyo INT PRIMARY KEY AUTO_INCREMENT,
    PatrocinadorApoyo VARCHAR(45) NOT NULL,
    DescripcionApoyo VARCHAR(45) NOT NULL
);

CREATE TABLE Participaciones(
	IdParticipacion INT PRIMARY KEY AUTO_INCREMENT,
    IdAlumnoParticipacion INT NOT NULL,
    IdAsesorParticipacion INT NOT NULL,
    IdEventoParticipacion INT NOT NULL,
    IdProyectoParticipacion INT NOT NULL,
    IdApoyoAlumnoParticipacion INT,
    IdApoyoAsesorParticipacion INT,
    FOREIGN KEY(IdAlumnoParticipacion) REFERENCES Alumnos(IdAlumno),
    FOREIGN KEY(IdAsesorParticipacion) REFERENCES Asesores(IdAsesor),
    FOREIGN KEY(IdEventoParticipacion) REFERENCES Eventos(IdEvento),
    FOREIGN KEY(IdProyectoParticipacion) REFERENCES Proyectos(IdProyecto),
    FOREIGN KEY(IdApoyoAlumnoParticipacion) REFERENCES Apoyos(IdApoyo),
    FOREIGN KEY(IdApoyoAsesorParticipacion) REFERENCES Apoyos(IdApoyo)
);