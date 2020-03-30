import { IResolvers } from "graphql-tools";
import { database } from "../data/data.store";
import _ from "lodash";
const mutation: IResolvers = {
  Mutation: {
    nuevoCurso(__: void, { curso }): any {
      const ItemCurso = {
        id: String(database.courses.length + 1),
        title: curso.title,
        description: curso.description,
        clases: curso.clases,
        time: curso.time,
        level: curso.level,
        logo: curso.logo,
        path: curso.path,
        teacher: curso.teacher,
        reviews: []
      };
      if (
        database.courses.filter(
          itemCourse => itemCourse.title === ItemCurso.title
        ).length === 0
      ) {
        database.courses.push(ItemCurso);
        return ItemCurso;
      } else {
        return {
          id: "-1",
          title: `el curso  ya existe con este titulo ${ItemCurso.title}`,
          description: "",
          clases: -1,
          time: 0.0,
          level: "TODOS",
          logo: "",
          path: "",
          teacher: "",
          reviews: []
        };
      }
    },
    modificarCurso(__: void, { curso }): any {
      const elementoExiste = _.findIndex(database.courses, function(o) {
        return o.id === curso.id;
      });
      if (elementoExiste > -1) {
        const valoraciones = database.courses[elementoExiste].reviews;
        curso.reviews = valoraciones;
        database.courses[elementoExiste] = curso;
        return curso;
      } else {
        return {
          id: "-1",
          title: `el curso no existe en la base de datos`,
          description: "",
          clases: -1,
          time: 0.0,
          level: "TODOS",
          logo: "",
          path: "",
          teacher: "",
          reviews: []
        };
      }
    },
    eliminarCurso(__: void, { id }): any {
      const borrarCurso = _.remove(database.courses, function(curso) {
        return curso.id === id;
      });
      if (borrarCurso[0] === undefined) {
        return {
          id: "-1",
          title:
            "el curso  no se a podido eliminar porque no se a encontrado ningun curso con ese ID",
          description: "",
          clases: -1,
          time: 0.0,
          level: "TODOS",
          logo: "",
          path: "",
          teacher: "",
          reviews: []
        };
      } else {
        return borrarCurso[0];
      }
    }
  }
};

export default mutation;
