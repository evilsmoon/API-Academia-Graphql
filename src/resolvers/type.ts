import { IResolvers } from "graphql-tools";
import { database } from "../data/data.store";
import _ from "lodash";
const type: IResolvers = {
  Estudiante: {
    courses: parent => {
      const cursosLista: Array<any> = [];
      parent.courses.map((curso: string) => {
        cursosLista.push(_.filter(database.courses, ["id", curso])[0]);
      });
      return cursosLista;
    }
  },
  Curso: {
    students: parent => {
      const listaEstudiantes: Array<any> = [];
      const idCurso = parent.id;
      database.student.map((estudiante: any) => {
        if (estudiante.courses.filter((id: any) => id === idCurso) > 0) {
          listaEstudiantes.push(estudiante);
        }
      });
      return listaEstudiantes;
    },
    path: parent => `http://www.udemy,com${parent.path}`
  }
};

export default type;
