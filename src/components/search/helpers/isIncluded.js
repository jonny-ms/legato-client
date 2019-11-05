export function isTeacherNameIncluded(teacherName, teacher) {
  let fullName = `${teacher.first_name} ${teacher.last_name}`;
  if (!teacherName) {
    return true;
  }
  if (fullName.toUpperCase().includes(teacherName.toUpperCase())) {
    return true;
  }
  return false;
}

export function isLevelIncluded(level, instrument, teacher) {
  if (level === "Select") {
    return true;
  }
  if (instrument !== "Select") {
    if (teacher.courses.some(course => course.instrument === instrument && course.level === level)) {
      return true
    }
  } else {
    if (teacher.courses.some(course => course.level === level)) {
      return true;
    }
  }
  return false;
}

export function isInstrumentIncluded(instrument, teacher) {
  if (instrument === "Select") {
    return true;
  }
  if (teacher.courses.some(course => course.instrument === instrument)) {
    return true;
  }
  return false;
}

export function isRateIncluded(rate, teacher) {
  if (!rate) {
    return true;
  }
  if (teacher.courses.some(course => course.rate <= rate)) {
    return true;
  }
  return false;
}