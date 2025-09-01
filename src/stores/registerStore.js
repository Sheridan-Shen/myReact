import { create } from "zustand";
export const useRegisterStore = create((set, get) => ({
  formData: {
    username: "",
    password: "",
    phone: "",
    verificationCode: "",
  },

  verificationCodeState: {
    countdown: 0,
    isLoading: false,
  },

  onUpdateFormData: (field, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value,
      },
    })),

  sendVerificationCode: () => {
    const { formData } = useRegisterStore.getState();
    if (!formData.phone || formData.phone.length !== 11) {
      alert("请输入正确的手机号");
      return;
    }

    set((state) => ({
      verificationCodeState: {
        ...state.verificationCodeState,
        countdown: 5,
        isLoading: true,
      },
    }));
    console.log("发送验证码到手机号:", formData.phone);

    const interval = setInterval(() => {
      set((state) => ({
        verificationCodeState: {
          countdown: state.verificationCodeState.countdown - 1,
          isLoading: state.verificationCodeState.countdown - 1 > 0,
        },
      }));

      if (get().verificationCodeState.countdown <= 0) {
        clearInterval(interval);
      }
    }, 1000);
  },
}));
