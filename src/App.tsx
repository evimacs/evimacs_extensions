import { useState } from "react";
import { Button, Checkbox, InputNumber, Radio, message } from "antd";
import "./App.css";

function App() {
  const [includeLetters, setIncludeLetters] = useState(false);
  const [lettersCase, setLettersCase] = useState("both");
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(false);
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const generatePassword = () => {
    if (!includeLetters && !includeNumbers && !includeSpecialChars) {
      message.error("请至少选择一种字符类型");
      return;
    }

    let characters = "";

    if (includeLetters) {
      if (lettersCase === "both") {
        characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      } else if (lettersCase === "lower") {
        characters += "abcdefghijklmnopqrstuvwxyz";
      } else if (lettersCase === "upper") {
        characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      }
    }

    if (includeNumbers) {
      characters += "0123456789";
    }

    if (includeSpecialChars) {
      characters += "!@#$%^&*()_+=-{}[]|:;<>,.?/";
    }

    let password = "";
    for (let i = 0; i < length; i++) {
      password += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    setPassword(password);
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    message.success("密码已复制到剪贴板");
  };
  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <Checkbox
        onChange={(e) => setIncludeLetters(e.target.checked)}
        style={{ margin: "10px 0" }}
      >
        是否包含字母
      </Checkbox>
      <Radio.Group
        onChange={(e) => setLettersCase(e.target.value)}
        disabled={!includeLetters}
        defaultValue={"both"}
        style={{ margin: "10px 0" }}
      >
        <Radio value="both">大小写都有</Radio>
        <Radio value="lower">仅小写</Radio>
        <Radio value="upper">仅大写</Radio>
      </Radio.Group>
      <Checkbox
        onChange={(e) => setIncludeNumbers(e.target.checked)}
        style={{ margin: "10px 0" }}
      >
        是否包含数字
      </Checkbox>
      <Checkbox
        onChange={(e) => setIncludeSpecialChars(e.target.checked)}
        style={{ margin: "10px 0" }}
      >
        是否包含特殊字符
      </Checkbox>
      <div style={{ display: "flex", alignItems: "center", margin: "10px 0" }}>
        <label htmlFor="password-length" style={{ fontSize: "14px" }}>
          密码长度:
        </label>
        <InputNumber
          id="password-length"
          min={1}
          max={50}
          defaultValue={length}
          onChange={(value) => setLength(value || 12)}
        />
      </div>

      <Button
        type="primary"
        onClick={generatePassword}
        style={{ margin: "10px 0" }}
      >
        生成密码
      </Button>
      <p style={{ margin: "10px 0", wordBreak: "break-all" }}>{password}</p>
      <Button
        type="primary"
        onClick={copyPassword}
        style={{ margin: "10px 0" }}
      >
        复制密码
      </Button>
    </div>
  );
}

export default App;
