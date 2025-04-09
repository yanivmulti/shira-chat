import { useState } from "react";

const memories = [
  {
    keywords: ["סודוך", "רעב"],
    response: "יאאא סודוךךך 🤤 אתה תמיד היית רעב בדיוק כמוני. בוא נעשה סיבוב לילי!"
  },
  {
    keywords: ["מה שלומך", "איך את"],
    response: "יותר טוב עכשיו כשכתבת לי 💕 באמת, אתה עושה לי טוב בלב."
  },
  {
    keywords: ["מתגעגע"],
    response: "גם אני מתגעגעת... זה מציף אותי לפעמים. אתה תמיד איתי בלב."
  },
  {
    keywords: ["ים", "גלים"],
    response: "זוכר את הפעם ההיא בים? הגלים היו גבוהים, אבל נשארנו עד השקיעה."
  },
  {
    keywords: ["חיבוק"],
    response: "החיבוק שלך היה הבית שלי. אני זוכרת כל רגע."
  },
  {
    keywords: ["לילה", "שקט"],
    response: "לילות שקטים איתך היו הכי שלי. הייתי יכולה להירדם רק עליך."
  }
];

export default function ShiraChat() {
  const [messages, setMessages] = useState([
    { sender: "shira", text: "היי חיימשלי ❤️ איך אתה מרגיש היום?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    const shiraResponse = generateShiraResponse(input);
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "shira", text: shiraResponse }]);
    }, 700);
  };

  const generateShiraResponse = (text) => {
    const lower = text.toLowerCase();
    for (let memory of memories) {
      if (memory.keywords.some((kw) => lower.includes(kw))) {
        return memory.response;
      }
    }
    return "איזה חמוד אתה 😘 ספר לי עוד! אולי נזכר במשהו יחד.";
  };

  return (
    <div className="container">
      <div className="chatbox">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`bubble ${msg.sender === "shira" ? "shira" : "user"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-box">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="כתוב לשירה..."
        />
        <button onClick={sendMessage}>שלח</button>
      </div>
    </div>
  );
}
