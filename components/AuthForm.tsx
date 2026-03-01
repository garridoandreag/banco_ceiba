"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof authFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);
    console.log(values);
    setIsLoading(false);
  }

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer flex items-center gap-1">
          <Image
            src="/icons/leaf.svg"
            width={34}
            height={34}
            alt="Logo Banco Ceiba"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Banco Ceiba
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user
              ? "Link Account"
              : type === "sign-in"
              ? "Ingreso a Banca en Línea"
              : "Sign Up"}
            <p className="text-16 font-normal text-gray-600">
              {user
                ? "Por favor, vincula tu cuenta para comenzar"
                : "Por favor, digite su informacion de ingreso al sistema."}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">{/* PlaidLink*/}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <CustomInput
                    control={form.control}
                    name="firstName"
                    label="Nombres"
                    type="text"
                    placeholder="Ingresa tu nombre"
                  />
                  <CustomInput
                    control={form.control}
                    name="lastName"
                    label="Apellidos"
                    type="text"
                    placeholder="Ingresa tus apellidos"
                  />
                  <CustomInput
                    control={form.control}
                    name="address"
                    label="Dirección"
                    type="text"
                    placeholder="Ingresa tu dirección"
                  />
                  <CustomInput
                    control={form.control}
                    name="department"
                    label="Departamento"
                    type="text"
                    placeholder="Ejemplo: Zacapa"
                  />
                  <CustomInput
                    control={form.control}
                    name="municipality"
                    label="Municipio"
                    type="text"
                    placeholder="Ejemplo: Teculután"
                  />
                  <CustomInput
                    control={form.control}
                    name="postalCode"
                    label="Código Postal"
                    type="text"
                    placeholder="Ejemplo: 19005"
                  />
                  <CustomInput
                    control={form.control}
                    name="dateOfBirth"
                    label="Fecha de Nacimiento"
                    type="date"
                    placeholder="Ejemplo: 01-01-2000"
                  />
                  <CustomInput
                    control={form.control}
                    name="dpi"
                    label="DPI"
                    type="text"
                    placeholder="Ejemplo: 3015 57566 1905"
                  />
                </>
              )}
              <CustomInput
                control={form.control}
                name="username"
                label="Usuario"
                type="text"
                placeholder="Ingresa tu Usuario"
              />
              <CustomInput
                control={form.control}
                name="password"
                label="Contraseña"
                type="password"
                placeholder="Ingresa tu Contraseña"
              />
              <div className="flex flex-col gap-4">
                <Button type="submit" className="form-btn" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      &nbsp; Cargando...
                    </>
                  ) : type === "sign-in" ? (
                    "Ingresar"
                  ) : (
                    "Crear Cuenta"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "¿No tienes una cuenta?"
                : "¿Ya tienes una cuenta?"}
            </p>
            <Link
              className="form-link"
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
            >
              {type === "sign-in" ? "Crear una cuenta" : "Ingresar a la cuenta"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
