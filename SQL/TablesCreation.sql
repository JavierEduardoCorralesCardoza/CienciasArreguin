DROP TABLE IF EXISTS Apoyos;
DROP TABLE IF EXISTS ProyectoPorEvento;
DROP TABLE IF EXISTS AsesorPorEvento;
DROP TABLE IF EXISTS AlumnoPorEvento;
DROP TABLE IF EXISTS Eventos;
DROP TABLE IF EXISTS Proyectos;
DROP TABLE IF EXISTS Asesores;
DROP TABLE IF EXISTS Alumnos;

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
    FechaEvento DATE NOT NULL,
    IdAsesorEvento INT NOT NULL,
    FOREIGN KEY(IdAsesorEvento) REFERENCES Asesores(IdAsesor)
);

CREATE TABLE AlumnoPorEvento(
	IdAlumnoPorEvento INT PRIMARY KEY AUTO_INCREMENT,
    ResultadoAlumnoPorEvento VARCHAR(45) NOT NULL,
    IdAlumnoEvento INT NOT NULL,
    IdEventoAlumno INT NOT NULL,
    FOREIGN KEY(IdAlumnoEvento) REFERENCES Alumnos(IdAlumno),
    FOREIGN KEY(IdEventoAlumno) REFERENCES Eventos(IdEvento)
);

CREATE TABLE AsesorPorEvento(
	IdAsesorPorEvento INT PRIMARY KEY AUTO_INCREMENT,
    IdAsesorEvento INT NOT NULL,
    IdEventoAsesor INT NOT NULL,
    FOREIGN KEY(IdAsesorEvento) REFERENCES Asesores(IdAsesor),
    FOREIGN KEY(IdEventoAsesor) REFERENCES Eventos(IdEvento)
);

CREATE TABLE ProyectoPorEvento(
	IdProyectoPorEvento INT PRIMARY KEY AUTO_INCREMENT,
    IdProyectoEvento INT NOT NULL,
    IdEventoProyecto INT NOT NULL,
    FOREIGN KEY(IdProyectoEvento) REFERENCES Proyectos(IdProyecto),
    FOREIGN KEY(IdEventoProyecto) REFERENCES Eventos(IdEvento)
);

CREATE TABLE Apoyos(
	IdApoyo INT PRIMARY KEY AUTO_INCREMENT,
    PatrocinadorApoyo VARCHAR(45) NOT NULL,
    DescripcionApoyo INT NOT NULL,
    IdAlumnoPorEventoApoyo INT,
    IdAsesorPorEventoApoyo INT,
    FOREIGN KEY(IdAlumnoPorEventoApoyo) REFERENCES AlumnoPorEvento(IdAlumnoPorEvento),
    FOREIGN KEY(IdAsesorPorEventoApoyo) REFERENCES AsesorPorEvento(IdAsesorPorEvento)
);