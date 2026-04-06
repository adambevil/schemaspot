"use client";

import { useState } from "react";
import { ValidationResult } from "@/lib/schema-validator";

interface SchemaOutputProps {
  jsonLd: Record<string, unknown>;
  validation: ValidationResult | null;
}

export function SchemaOutput({ jsonLd, validation }: SchemaOutputProps) {
  const [copied, setCopied] = useState(false);
  const formatted = JSON.stringify(jsonLd, null, 2);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formatted);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = formatted;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([formatted], { type: "application/ld+json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const fileName = (jsonLd.name as string || "schema").replace(/[^a-z0-9]/gi, "-").toLowerCase();
    a.download = `${fileName}.jsonld`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      {/* Validation Results */}
      {validation && (
        <div className="mb-4">
          {validation.errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-2">
              <p className="text-sm font-semibold text-red-700 mb-1">
                {validation.errors.length} Error{validation.errors.length > 1 ? "s" : ""}
              </p>
              {validation.errors.map((e, i) => (
                <p key={i} className="text-xs text-red-600">• {e.message}</p>
              ))}
            </div>
          )}
          {validation.warnings.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-2">
              <p className="text-sm font-semibold text-amber-700 mb-1">
                {validation.warnings.length} Warning{validation.warnings.length > 1 ? "s" : ""}
              </p>
              {validation.warnings.map((w, i) => (
                <p key={i} className="text-xs text-amber-600">• {w.message}</p>
              ))}
            </div>
          )}
          {validation.isValid && validation.warnings.length === 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm font-semibold text-green-700">✓ Schema is valid and complete!</p>
            </div>
          )}
        </div>
      )}

      {/* JSON Output */}
      <pre className="bg-gray-900 text-green-400 rounded-lg p-4 text-xs overflow-auto max-h-[500px] font-mono leading-relaxed">
        {formatted}
      </pre>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={handleCopy}
          className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition duration-200 flex items-center justify-center gap-2"
        >
          {copied ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              Copy to Clipboard
            </>
          )}
        </button>
        <button
          onClick={handleDownload}
          className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg text-sm font-medium transition duration-200 flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          Download .jsonld
        </button>
      </div>

      {/* HTML Embed Snippet */}
      <div className="mt-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">HTML Embed Snippet</h4>
        <p className="text-xs text-gray-500 mb-2">Paste this inside the &lt;head&gt; of your website:</p>
        <pre className="bg-gray-800 text-blue-300 rounded-lg p-3 text-xs overflow-auto max-h-[150px] font-mono">
          {`<script type="application/ld+json">\n${formatted}\n<\/script>`}
        </pre>
        <button
          onClick={async () => {
            const htmlSnippet = `<script type="application/ld+json">\n${formatted}\n<\/script>`;
            try {
              await navigator.clipboard.writeText(htmlSnippet);
            } catch {
              const ta = document.createElement("textarea");
              ta.value = htmlSnippet;
              document.body.appendChild(ta);
              ta.select();
              document.execCommand("copy");
              document.body.removeChild(ta);
            }
          }}
          className="mt-2 text-xs text-blue-600 hover:text-blue-800 underline"
        >
          Copy HTML snippet
        </button>
      </div>
    </div>
  );
}
