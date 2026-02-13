import { useState, useRef, useCallback } from "react";
import { Upload, X, FileText } from "lucide-react";

export default function FileUpload({ onFileSelect, disabled }) {
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const inputRef = useRef(null);

    const handleFile = useCallback(
        (file) => {
            if (!file) return;
            const ext = file.name.split(".").pop().toLowerCase();
            if (!["txt", "pdf"].includes(ext)) {
                alert("Please upload a .txt or .pdf file");
                return;
            }
            setSelectedFile(file);
            onFileSelect(file);
        },
        [onFileSelect]
    );

    const handleDrag = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback(
        (e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);
            if (e.dataTransfer.files?.[0]) {
                handleFile(e.dataTransfer.files[0]);
            }
        },
        [handleFile]
    );

    const handleChange = (e) => {
        if (e.target.files?.[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const removeFile = (e) => {
        e.stopPropagation();
        setSelectedFile(null);
        onFileSelect(null);
        if (inputRef.current) inputRef.current.value = "";
    };

    return (
        <div
            className={`dropzone ${dragActive ? "active" : ""} rounded-xl p-5 sm:p-8 text-center cursor-pointer transition-all duration-300 ${disabled ? "opacity-50 pointer-events-none" : ""}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
        >
            <input
                ref={inputRef}
                type="file"
                accept=".txt,.pdf"
                onChange={handleChange}
                className="hidden"
                id="file-upload"
            />

            {selectedFile ? (
                <div className="flex items-center justify-center gap-4 animate-fade-in">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-left">
                        <p className="text-sm font-medium text-foreground">
                            {selectedFile.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {(selectedFile.size / 1024).toFixed(1)} KB
                        </p>
                    </div>
                    <button
                        onClick={removeFile}
                        className="ml-2 p-1.5 rounded-full hover:bg-destructive/20 transition-colors"
                    >
                        <X className="w-4 h-4 text-destructive" />
                    </button>
                </div>
            ) : (
                <div className="space-y-3">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center animate-float">
                        <Upload className="w-5 h-5 sm:w-7 sm:h-7 text-primary" />
                    </div>
                    <div>
                        <p className="text-xs sm:text-sm font-medium text-foreground">
                            Drop your medical report here
                        </p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                            or click to browse · Supports .txt and .pdf
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
