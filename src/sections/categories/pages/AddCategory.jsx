import { useFormik } from "formik";
import categoriesSchema from "../../../schemas/categories/categoriesSchema";
import Input from "src/components/inputs/Input";
import Button from "../../../components/buttons/Button";
import APIClient from "../../../utils/ApiClient";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoriesQueryKey } from "./CategoriesTable";

const AddCategory = () => {
  const nav = useNavigate(-1);
  const apiClient = new APIClient(`categories`);
  const queryClient = useQueryClient();
  const handleSubmit = useMutation({
    mutationKey: [categoriesQueryKey],
    mutationFn: (data) => apiClient.addData({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [categoriesQueryKey],
      });
      nav(-1);
    },
  });
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: categoriesSchema,
    onSubmit: async (values) => await handleSubmit.mutateAsync(values),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Input
        title="name"
        errorText={formik.touched.name && formik.errors.name}
        onChange={formik.handleChange}
        value={formik.values.name}
        name="name"
        placeholder="write category name"
      />
      <Button
        btnStyleType="outlin"
        btnType="save"
        isSending={formik.isSubmitting}
      >
        submit
      </Button>
    </form>
  );
};

export default AddCategory;
