import React from 'react';
import { FileText, Code, PenTool, Mail } from 'lucide-react';
import { promptTemplates } from '../assets/promptTemplates';

const iconMap = {
  FileText: <FileText className="w-5 h-5 text-purple-500" />,
  Code: <Code className="w-5 h-5 text-blue-500" />,
  PenTool: <PenTool className="w-5 h-5 text-pink-500" />,
  Mail: <Mail className="w-5 h-5 text-green-500" />
};

const PromptTemplates = ({ onSelectTemplate }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-3xl mx-auto mt-8 px-4">
      {promptTemplates.map((template) => (
        <div
          key={template.id}
          onClick={() => onSelectTemplate(template.prompt)}
          className="border border-gray-200 dark:border-[#252525] bg-white dark:bg-[#1a1a1a] p-4 rounded-xl cursor-pointer
                     hover:shadow-md hover:border-purple-300 dark:hover:border-[#3a3a3a] transition-all active:scale-95 flex items-start gap-3"
        >
          <div className="p-2 bg-gray-50 dark:bg-[#252525] rounded-lg shrink-0">
            {iconMap[template.icon]}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-200 mb-1">{template.title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">{template.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PromptTemplates;
