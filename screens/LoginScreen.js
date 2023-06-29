import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import * as Icon from "react-native-feather";
import * as Yup from "yup";
import { styles, theme } from "../themes";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../components/BackButton";

export default function LoginScreen() {
  const loginValidationScheme = Yup.object().shape({
    email: Yup.string()
      .email("Email Invalid")
      .required("Please enter your email!"),
    password: Yup.string()
      .min(8, ({ min }) => `Please enter at least ${min} characters`)
      .required("Please enter a password")
      .matches("(?=.*?[A-Z])", "UpperCase at least 1 character"),
  });

  const [keyboard, setKeyboard] = useState(true);
  const [security, setSecurity] = useState(true);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => {
      setKeyboard(false);
    });
    Keyboard.addListener("keyboardDidHide", () => {
      setKeyboard(true);
    });
  }, []);

  const mt = `${keyboard ? "-mt-5" : "mt-14"}`;
  const navigation = useNavigation();

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={async (value) => {
        if (value) {
          await signInWithEmailAndPassword(auth, value.email, value.password);
        } else {
          alert("Error");
        }
      }}
      validationSchema={loginValidationScheme}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
        isValid,
      }) => (
        <KeyboardAvoidingView className="flex-1 bg-neutral-900">
          <View className="w-full z-20">
            <SafeAreaView className="w-full absolute top-2 z-20 flex-row justify-between items-center px-4">
              <BackButton />
            </SafeAreaView>
          </View>
          <View className=" flex-1 items-center justify-center">
            <Text style={styles.text} className="font-extrabold text-6xl">
              L<Text className="text-white">ogin</Text>
            </Text>
          </View>
          <View className="flex-1 items-center">
            <View className="w-full px-4">
              <TextInput
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                placeholderTextColor={"lightgray"}
                placeholder="Enter Your Email"
                className="bg-neutral-600 rounded-xl p-3 pl-4 w-full text-white text-base"
              />
              {errors.email && touched.email ? (
                <Text style={styles.text} className="mt-1 ml-1 text-base">
                  {errors.email}
                </Text>
              ) : (
                <Text className="mt-1 ml-1 text-base">''</Text>
              )}
              <View>
                <TextInput
                  onChangeText={handleChange("password")}
                  secureTextEntry={security}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  placeholderTextColor={"lightgray"}
                  placeholder="Enter Your Password"
                  className="bg-neutral-600 rounded-xl p-3 pl-4 w-full text-white text-base mt-1"
                />
                <TouchableOpacity
                  onPress={() => setSecurity(!security)}
                  className="absolute right-3 top-5"
                >
                  {security ? (
                    <Icon.EyeOff width={20} height={20} color={"white"} />
                  ) : (
                    <Icon.Eye width={20} height={20} color={"white"} />
                  )}
                </TouchableOpacity>
                {errors.password && touched.password ? (
                  <Text style={styles.text} className="mt-1 ml-1 text-base">
                    {errors.password}
                  </Text>
                ) : (
                  <Text className="mt-1 ml-1 text-base">''</Text>
                )}
              </View>
              <TouchableOpacity>
                <Text
                  style={styles.text}
                  className="mt-2 text-right underline text-base "
                >
                  Forgot password ?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex-1 mx-4">
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={!isValid}
              style={{
                backgroundColor: isValid ? theme.background : "#F16767",
              }}
              className={`justify-center items-center ${mt} py-3 rounded-3xl`}
            >
              <Text className="font-bold text-white text-xl">Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Register")}
              style={styles.background}
              className="justify-center items-center  mt-5 py-3 rounded-3xl"
            >
              <Text className="font-bold text-white text-xl">Register</Text>
            </TouchableOpacity>
            {keyboard && (
              <>
                <View className="flex-row justify-center items-center mt-7 overflow-hidden">
                  <Text className="text-white">
                    -----------------------------------------
                  </Text>
                  <Text className="text-white mx-3 font-bold">Other</Text>
                  <Text className="text-white">
                    -----------------------------------------
                  </Text>
                </View>
                <View className="flex-row justify-around items-center mt-6">
                  <TouchableOpacity>
                    <Image
                      className="w-16 h-16"
                      source={require("../assets/images/Facebook_f_logo_(2021).svg.png")}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      className="w-16 h-16"
                      source={require("../assets/images/Google__G__Logo.svg.png")}
                    />
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
}
