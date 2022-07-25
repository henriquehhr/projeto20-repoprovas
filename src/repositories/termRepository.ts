import prisma from "../config/database.js";

export async function findAllWithDisciplines() {
  const terms: any = await prisma.term.findMany({
    include: {
      disciplines: {}
    }
  });
  return terms;
}

// const terms = await prisma.term.findMany({
//   include: {
//     disciplines: {
//       select: {
//         id: true,
//         name: true,
//         teachersDisciplines:{
//           select: {
//             tests: {
//               select: {
//                 id: true,
//                 name: true,
//                 pdfUrl: true,
//                 category: {
//                   select: {
//                     id: true,
//                     name: true
//                   }
//                 }
//               }
//             },
//             teacher: {
//               select: {
//                 name: true
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// });