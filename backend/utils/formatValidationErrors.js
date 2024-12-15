const formatValidationErrors = (error) => {
  if (error.name !== "ValidationError") return null;
  const errors = Object.values(error.errors).map((err) => ({
    field: err.path,
    message: err.message,
  }));
  return {
    status: 400,
    message: "Erreur de validation",
    errors,
  };
};

export default formatValidationErrors;
