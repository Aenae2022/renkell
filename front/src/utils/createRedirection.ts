export const redirectionNoUser = () => {
    // Redirection vers la page d'accueil
      const schoolRef = localStorage.getItem("school");
      const classroomRef = localStorage.getItem("classroom");
      const redirection =
        "/degemer/" +
        (schoolRef ? schoolRef : "0") +
        (classroomRef ? "/c/" + classroomRef : "");
    return redirection
}