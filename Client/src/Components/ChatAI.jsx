// import { useState, useRef, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import axiosClient from "../API/axiosClient";
// import { Send } from 'lucide-react';


// function ChatAI({ problem, language}) {


//     // console.log(problem)

//     const [messages, setMessages] = useState([
//         { role: 'model', parts: [{text: 'Hi, How are you'}]},
//         { role: 'user', parts: [{text:'well'}]}
//     ]);

//     const { register, handleSubmit, reset, formState: {errors} } = useForm();
//     const messagesEndRef = useRef(null);

    
//     useEffect(() => {
//         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, [messages]);


//     const onSubmit = async (data) => {
        
//         setMessages(prev => [...prev, { role: 'user', parts: [{text: data.message}] }]);
//         reset();

//         try {
            
//             const response = await axiosClient.post("/ai/chat", {

//                 message: data.message,
//                 title:problem.title,
//                 description:problem.description,
//                 testCases: problem.visibleTestCases,
//                 startCode:problem.startCode,
//                 language : language

//             });

           
//             setMessages(prev => [...prev, { 
//                 role: 'model',
//                 parts: [{text: response.data.message}]
//             }]);
            
//         } catch (error) {
//             console.error("API Error:", error);
//             setMessages(prev => [...prev, { 
//                 role: 'model', 
//                 parts: [{text: 'Sorry, I am encoutering an error'}]
//             }]);
//         }
//     };

//     return (
//         <div className="flex flex-col h-screen max-h-[80vh] min-h-[500px]">
//             <div className="flex-1 overflow-y-auto p-4 space-y-4">
//                 {messages.map((msg, index) => (
//                     <div 
//                         key={index} 
//                         className={`chat ${msg.role === "user" ? "chat-end" : "chat-start"}`}
//                     >
//                         <div className="chat-bubble bg-base-200 text-base-content">
//                             {msg.parts[0].text}
//                         </div>
//                     </div>
//                 ))}
//                 <div ref={messagesEndRef} />
//             </div>

//             <form 
//                 onSubmit={handleSubmit(onSubmit)} 
//                 className="sticky bottom-0 p-4 bg-base-100 border-t"
//             >
//                 <div className="flex items-center">
//                     <input 
//                         placeholder="Ask me anything" 
//                         className="input input-bordered flex-1" 
//                         {...register("message", { required: true, minLength: 2 })}
//                     />
//                     <button 
//                         type="submit" 
//                         className="btn btn-ghost ml-2"
//                         disabled={errors.message}
//                     >
//                         <Send size={20} />
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// }

// export default ChatAI;








// import { useState, useRef, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import axiosClient from "../API/axiosClient";
// import { Send } from 'lucide-react';

// function ChatAI({ problem, language }) {

//   const [messages, setMessages] = useState([
//     { role: 'model', content: 'Hi! How can I help you today?' },
//   ]);

//   const { register, handleSubmit, reset, formState: { errors } } = useForm();
//   const messagesEndRef = useRef(null);

//   // Scroll to bottom when new message arrives
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const onSubmit = async (data) => {
//     const userMessage = data.message.trim();
//     if (!userMessage) return;

//     setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
//     reset();

//     try {
//       const response = await axiosClient.post("/ai/chat", {
//         message: userMessage,
//         title: problem.title,
//         description: problem.description,
//         testCases: problem.visibleTestCases,
//         startCode: problem.startCode,
//         language: language,
//       });

//       setMessages(prev => [...prev, { role: 'model', content: response.data.message }]);
//     } catch (error) {
//       console.error("API Error:", error);
//       setMessages(prev => [...prev, { role: 'model', content: 'Sorry, something went wrong.' }]);
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen max-h-[80vh] min-h-[500px] border rounded-lg shadow-md bg-gray-800">
      
//       {/* Chat messages */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
//           >
//             <div className={`p-3 rounded-lg max-w-[70%] break-words
//               ${msg.role === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-100 text-gray-900 rounded-bl-none'}`}
//             >
//               {msg.content}
//               <div className="text-xs text-gray-400 mt-1 text-right">
//                 {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//               </div>
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input */}
//       <form 
//         onSubmit={handleSubmit(onSubmit)} 
//         className="sticky bottom-0 p-4 bg-gray-50 border-t flex items-center gap-2"
//       >
//         <input
//           type="text"
//           placeholder="Ask me anything..."
//           className="input input-bordered flex-1"
//           {...register("message", { required: true, minLength: 2 })}
//         />
//         <button
//           type="submit"
//           className="btn btn-primary p-2"
//           disabled={!!errors.message}
//         >
//           <Send size={20} />
//         </button>
//       </form>

//     </div>
//   );
// }

// export default ChatAI;







import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import axiosClient from "../API/axiosClient";
import { Send } from "lucide-react";

function ChatAI({ problem, language }) {
  const [messages, setMessages] = useState([
    { role: "model", text: "Hi! How can I help you with this problem?" },
  ]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatText = (text) => {
    // Split by newline and map to paragraphs
    return text.split("\n").map((line, idx) => {
      // Simple markdown-like bold headings
      if (line.startsWith("## ")) {
        return <h3 key={idx} className="font-bold text-lg mt-2">{line.replace("## ", "")}</h3>;
      } else if (line.startsWith("# ")) {
        return <h2 key={idx} className="font-bold text-xl mt-2">{line.replace("# ", "")}</h2>;
      } else {
        return <p key={idx} className="mt-1">{line}</p>;
      }
    });
  };

  const onSubmit = async (data) => {
    if (!data.message) return;

    // Add user message
    setMessages(prev => [...prev, { role: "user", text: data.message }]);
    reset();

    try {
      const response = await axiosClient.post("/ai/chat", {
        message: data.message,
        title: problem.title,
        description: problem.description,
        testCases: problem.visibleTestCases,
        startCode: problem.startCode,
        language: language
      });

      setMessages(prev => [
        ...prev,
        { role: "model", text: response.data.message }
      ]);

    } catch (err) {
      setMessages(prev => [
        ...prev,
        { role: "model", text: "Sorry, I am encountering an error." }
      ]);
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col h-screen max-h-[80vh] min-h-[500px] bg-base-100 border rounded-lg shadow-md">
      
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat ${msg.role === "user" ? "chat-end" : "chat-start"}`}>
            <div className={`chat-bubble break-words ${msg.role === "user" ? "bg-green-700 text-white" : "bg-gray-800 text-white"}`}>
              {formatText(msg.text)}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit(onSubmit)} className="sticky bottom-0 p-4 bg-base-200 border-t flex gap-2">
        <input
          {...register("message", { required: true, minLength: 2 })}
          placeholder="Ask a question or get a hint"
          className="input input-bordered flex-1 bg-black text-white"
        />
        <button type="submit" className="btn btn-primary" disabled={errors.message}>
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}

export default ChatAI;
