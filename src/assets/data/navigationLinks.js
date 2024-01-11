const navigationLinks = {
  ADMIN: [
    { label: "Package", routerLink: "/eminence/admin/package" },
    { label: "Institution", routerLink: "/eminence/admin/institution" },
    { label: "Subscription", routerLink: "/eminence/admin/subscriber" },
    { label: "Topic", routerLink: "/eminence/admin/topic" },
    { label: "Role", routerLink: "/eminence/admin/role" },
    { label: "User", routerLink: "/eminence/admin/user" },
    { label: "Subject", routerLink: "/eminence/admin/subject" },
    { label: "System", routerLink: "/eminence/admin/system" },
    { label: "Subsystem", routerLink: "/eminence/admin/sub-system" },
    {
      label: "Assign Attr / Vetter",
      routerLink: "/eminence/admin/addattributes",
    },
    { label: "QGen", routerLink: "/eminence/faculty/qgen" },
  ],
  FACULTY: [
    { label: "QGen", routerLink: "/eminence/faculty/qgen" },
    { label: "ReviewQ", routerLink: "/eminence/faculty/reviewQ" },
    { label: "Ask Eminence", routerLink: "/eminence/faculty/askeminence" },
    { label: "History", routerLink: "/eminence/faculty/history" },
  ],
  VETTER: [
    { label: "Review Q", routerLink: "/eminence/vetter/open-items" },
    { label: "History", routerLink: "/eminence/vetter/history" },
  ],
  STUDENT: [
    {
      label: "Build Test",
      routerLink: "/eminence/student/build-test",
      icon: "build",
    },
    {
      label: "QGen",
      routerLink: "/eminence/faculty/qgen",
      icon: "question_answer",
    },
    {
      label: "History",
      routerLink: "/eminence/student/saved",
      icon: "insert_drive_file",
    },
    {
      label: "Exam Room",
      routerLink: "/eminence/student/exam-room",
      icon: "people",
    },
  ],
};
module.exports = navigationLinks;
