import "./Register.css";
import { useRegisterStore } from "../stores/registerStore";

function VerificationCodeButton() {
  const { sendVerificationCode, verificationCodeState } = useRegisterStore();

  return (
    <button
      type="button"
      onClick={sendVerificationCode}
      disabled={
        verificationCodeState.countdown > 0 || verificationCodeState.isLoading
      }
    >
      {verificationCodeState.countdown > 0
        ? `${verificationCodeState.countdown}s后重发`
        : "发送验证码"}
    </button>
  );
}

function Register() {
  const { formData, onUpdateFormData } = useRegisterStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    // 处理表单提交逻辑
    console.log("表单提交");
    console.log(formData);
  };

  return (
    <div className="Register">
      <h1>用户注册</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          <li>
            <label htmlFor="username">用户名</label>
            <input
              type="text"
              id="username"
              placeholder="请输入用户名"
              value={formData.username}
              onChange={function (e) {
                onUpdateFormData("username", e.target.value);
              }}
            />
          </li>
          <li>
            <label htmlFor="password">密码</label>
            <input
              type="password"
              id="password"
              placeholder="请输入密码"
              required
              onChange={function (e) {
                onUpdateFormData("password", e.target.value);
              }}
            />
          </li>
          <li>
            <label htmlFor="phone">手机号</label>
            <div className="phone-input-group">
              <input
                type="tel"
                id="phone"
                placeholder="请输入手机号"
                required
                onChange={function (e) {
                  onUpdateFormData("phone", e.target.value);
                }}
              />
              <VerificationCodeButton />
            </div>
          </li>
          <li>
            <label htmlFor="password">手机验证码</label>
            <input
              type="text"
              id="verificationCode"
              placeholder="请输入手机验证码"
              required
              onChange={function (e) {
                onUpdateFormData("verificationCode", e.target.value);
              }}
            />
          </li>
        </ul>
        <button type="submit">注册</button>
      </form>
    </div>
  );
}

export default Register;
