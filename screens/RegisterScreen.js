import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Icon from "react-native-feather";
import * as Yup from "yup";
import { styles, theme } from "../themes";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import BackButton from "../components/BackButton";
import { HeartIcon } from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import { setUserLoading } from "../redux/slices/user";

export default function LoginScreen() {
  const loginValidationScheme = Yup.object().shape({
    email: Yup.string()
      .email("Email Invalid")
      .required("Please enter your email!"),
    password: Yup.string()
      .min(8, ({ min }) => `Please enter at least ${min} characters`)
      .required("Please enter a password")
      .matches("(?=.*?[A-Z])", "UpperCase at least 1 character"),
    confirmPassword: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password"), null], "Passwords don't match."),
  });

  const [keyboard, setKeyboard] = useState(true);
  const [security, setSecurity] = useState(true);
  const [confirmSecurity, setConfirmSecurity] = useState(true);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => {
      setKeyboard(false);
    });
    Keyboard.addListener("keyboardDidHide", () => {
      setKeyboard(true);
    });
  }, []);

  const mt = `${keyboard ? "-mt-10" : "-mt-20"}`;
  const navigation = useNavigation();
  const { userLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{ email: "", password: "", confirmPassword: "" }}
      onSubmit={async (value) => {
        if (value) {
          dispatch(setUserLoading(true));
          await createUserWithEmailAndPassword(
            auth,
            value.email,
            value.password
          );
          dispatch(setUserLoading(false));
        } else {
          alert("Error");
          dispatch(setUserLoading(false));
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
            <SafeAreaView className="w-full absolute top-11 z-20 flex-row justify-between items-center px-4">
              <BackButton />
            </SafeAreaView>
          </View>
          <View className="z-0 relative flex-1 items-center justify-center">
            <Text style={styles.text} className="font-extrabold text-6xl z-0">
              R<Text className="text-white">egister</Text>
            </Text>
          </View>
          <View className="flex-1 items-center">
            <View className={`w-full px-4 ${mt}`}>
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
                  secureTextEntry={security}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  placeholderTextColor={"lightgray"}
                  placeholder="Enter Your Password"
                  className="bg-neutral-600 rounded-xl p-3 pl-4 w-full text-white text-base mt-4"
                />
                <TouchableOpacity
                  onPress={() => setSecurity(!security)}
                  className="absolute right-3 top-8"
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
              <View>
                <TextInput
                  secureTextEntry={confirmSecurity}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  value={values.confirmPassword}
                  placeholderTextColor={"lightgray"}
                  placeholder="Confirm Password"
                  className="bg-neutral-600 rounded-xl p-3 pl-4 w-full text-white text-base mt-4 "
                />
                <TouchableOpacity
                  onPress={() => setConfirmSecurity(!confirmSecurity)}
                  className="absolute right-3 top-8"
                >
                  {confirmSecurity ? (
                    <Icon.EyeOff width={20} height={20} color={"white"} />
                  ) : (
                    <Icon.Eye width={20} height={20} color={"white"} />
                  )}
                </TouchableOpacity>
                {errors.confirmPassword && touched.confirmPassword ? (
                  <Text style={styles.text} className="mt-1 ml-1 text-base">
                    {errors.confirmPassword}
                  </Text>
                ) : (
                  <Text className="mt-1 ml-1 text-base">''</Text>
                )}
              </View>
              <View className="mb-10">
                {userLoading ? (
                  <TouchableOpacity
                    className={`items-center w-full mt-6 py-3 rounded-3xl  `}
                  >
                    <Loading />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    disabled={!isValid}
                    onPress={handleSubmit}
                    style={{
                      backgroundColor: isValid ? theme.background : "#F16767",
                    }}
                    className={`items-center w-full mt-3 py-3 rounded-3xl `}
                  >
                    <Text className="font-bold text-white text-xl">
                      Register
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
          <View className={` justify-end items-center w-full px-4 `}>
            {keyboard && (
              <View className="flex-row">
                <Text className="text-white text-sm mb-10">
                  Do you already have an account?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.text} className="underline font-bold">
                    Login now!
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
}
