import {
  Input,
  Button,
  VStack,
  Select,
  Checkbox,
  Textarea,
  Image,
  Box,
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";

export type FormFieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "date"
  | "textarea"
  | "select"
  | "checkbox"
  | "image";

export interface FormFieldOption {
  label: string;
  value: string | number;
}

export interface FormField {
  name: string;
  label: string;
  type: FormFieldType;
  placeholder?: string;
  defaultValue?: string | number | boolean | File;
  options?: FormFieldOption[];
  isRequired?: boolean;
  validation?: (value: any) => string | null;
  accept?: string;
}

interface FormObjProps {
  fields: FormField[];
  onSubmit: (formData: Record<string, any>) => void;
  submitButtonLabel?: string;
  initialValues?: Record<string, any>;
}

export const FormObj = ({
  fields,
  onSubmit,
  submitButtonLabel = "Submit",
  initialValues = {},
}: FormObjProps) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [imagePreviews, setImagePreviews] = useState<Record<string, string>>(
    {},
  );

  useEffect(() => {
    const initialData: Record<string, any> = {};
    const initialImagePreviews: Record<string, string> = {};

    fields.forEach((field) => {
      const initialValueFromProps = initialValues[field.name];
      const defaultValue = field.defaultValue;

      if (field.type === "image") {
        initialData[field.name] = initialValueFromProps ?? defaultValue ?? null;
        if (initialValueFromProps instanceof File) {
          initialImagePreviews[field.name] = URL.createObjectURL(
            initialValueFromProps,
          );
        } else if (typeof initialValueFromProps === "string") {
          initialImagePreviews[field.name] = initialValueFromProps;
        } else if (defaultValue instanceof File) {
          initialImagePreviews[field.name] = URL.createObjectURL(defaultValue);
        } else if (typeof defaultValue === "string") {
          initialImagePreviews[field.name] = defaultValue;
        }
      } else {
        initialData[field.name] =
          initialValueFromProps ??
          defaultValue ??
          (field.type === "checkbox" ? false : "");
      }
    });
    setImagePreviews(initialImagePreviews);

    return () => {
      Object.values(initialImagePreviews).forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [fields]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, type } = e.target;
    let inputValue: any;

    if (type === "checkbox") {
      inputValue = (e.target as HTMLInputElement).checked;
    } else if (type === "file") {
      const fileInput = e.target as HTMLInputElement;
      inputValue = fileInput.files ? fileInput.files[0] : null;

      setImagePreviews((prevPreviews) => {
        const newPreviews = { ...prevPreviews };
        if (newPreviews[name] && newPreviews[name].startsWith("blob:")) {
          URL.revokeObjectURL(newPreviews[name]);
        }
        if (inputValue) {
          newPreviews[name] = URL.createObjectURL(inputValue);
        } else {
          delete newPreviews[name];
        }
        return newPreviews;
      });
    } else {
      inputValue = e.target.value;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: inputValue,
    }));

    if (formErrors[name]) {
      setFormErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    fields.forEach((field) => {
      const value = formData[field.name];
      if (field.isRequired) {
        let isEmpty = false;
        if (field.type === "checkbox") {
          isEmpty = value === false;
        } else if (field.type === "image") {
          isEmpty = !value;
        } else {
          isEmpty = value === "" || value === undefined || value === null;
        }

        if (isEmpty) {
          newErrors[field.name] = `${field.label} is required.`;
          isValid = false;
        }
      }

      if (isValid && field.validation) {
        const validationError = field.validation(value);
        if (validationError) {
          newErrors[field.name] = validationError;
          isValid = false;
        }
      }
    });

    setFormErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const renderField = (field: FormField) => {
    const { name, label, type, placeholder, options, accept } = field;

    switch (type) {
      case "textarea":
        return (
          <Textarea
            name={name}
            placeholder={placeholder}
            onChange={handleChange}
            id={name}
          />
        );

      case "select":
        return (
          <Select
            name={name}
            placeholder={placeholder || "Select option"}
            onChange={handleChange}
            id={name}
          >
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        );

      case "checkbox":
        return (
          <Checkbox
            name={name}
            isChecked={!!value}
            onChange={handleChange}
            id={name}
          >
            {label}
          </Checkbox>
        );

      case "image":
        return (
          <Box>
            <Input
              type="file"
              name={name}
              onChange={handleChange}
              id={name}
              accept={accept || "image/*"}
              p={1.5}
              sx={{
                "::file-selector-button": {
                  height: 10,
                  paddingX: 4,
                  paddingRight: 8,
                  marginRight: 4,
                  fontSize: "10pt",
                  border: "none",
                  borderRadius: "md",
                  backgroundColor: "gray.100",
                  cursor: "pointer",
                  _hover: {
                    backgroundColor: "gray.200",
                  },
                },
              }}
            />
            {imagePreviews[name] && (
              <Image
                src={imagePreviews[name]}
                alt={`${label} preview`}
                boxSize="150px"
                objectFit="cover"
                mt={2}
                borderRadius="md"
              />
            )}
          </Box>
        );

      default:
        return (
          <Input
            type={type}
            name={name}
            placeholder={placeholder}
            onChange={handleChange}
            id={name}
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack gap={4} align="stretch">
        {fields.map((field) => {
          const fieldError = formErrors[field.name];
          return (
            <FormControl
              key={field.name}
              isInvalid={!!fieldError}
              isRequired={field.isRequired && field.type !== "checkbox"}
            >
              {field.type !== "checkbox" && (
                <FormLabel htmlFor={field.name}>{field.label}</FormLabel>
              )}
              {renderField(field)}
              <FormErrorMessage>{fieldError}</FormErrorMessage>
            </FormControl>
          );
        })}
        <Button type="submit" variant="solid">
          {submitButtonLabel}
        </Button>
      </VStack>
    </form>
  );
};
