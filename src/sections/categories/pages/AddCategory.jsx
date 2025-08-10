import { useFormik } from "formik";
import categoriesSchema from "../../../schemas/categories/categoriesSchema";
import Input from "src/components/inputs/Input";
import Button from "../../../components/buttons/Button";
import APIClient from "../../../utils/ApiClient";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoriesQueryKey } from "./CategoriesTable";
import UploadPhoto from "../../../components/inputs/UploadPhoto";
import SelectOptionInput from "../../../components/inputs/SelectOptionInput ";
import { memo, useMemo } from "react";
import SelectInputApi from "../../../components/inputs/SelectInputApi";

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
      image: "",
      test: "",
      diyar: "",
    },
    validationSchema: categoriesSchema,
    onSubmit: async (values) => await handleSubmit.mutateAsync(values),
  });
  const options = useMemo(
    () => [
      {
        text: "front text",
        value: "enum value",
      },
      {
        text: "front text 2",
        value: "enum value",
        onSelectOption: () => formik.setFieldValue("test", "diyar"),
      },
    ],
    [formik]
  );

  return (
    <>
      <SelectOptionInput
        label="test"
        placeholder="input placeholder"
        value={formik.values.test}
        options={options}
        onSelectOption={(option) => formik.setFieldValue("test", option.value)}
        errorText="dlsadklas"
      />
      <SelectInputApi
        label="dasds"
        placeholder="dsa"
        endPoint={categoriesQueryKey}
        queryKey={categoriesQueryKey}
        optionLabel={(option) => option?.name}
        onChange={(option) => formik.setFieldValue("diyar", option.name)}
        value={["diyar", "diyar2"]}
        errorText="dlsadklas"
        onIgnore={() => formik.setFieldValue("diyar", "")}
        isArray
      />
      <UploadPhoto
        name="image"
        title="porfile"
        value={formik.values.image}
        onChange={(val) => formik.setFieldValue("image", val)}
        errorText={formik.touched.image && formik.errors.image}
      />
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
          className="popup-btn"
        >
          submit
        </Button>
      </form>
    </>
  );
};

export default memo(AddCategory);
