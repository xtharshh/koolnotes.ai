"use client";
import { useDropzone } from 'react-dropzone';
import { useState } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader } from "./ui/card";
import { useToast } from "../hooks/use-toast";

export function UploadForm() {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    price: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc', '.docx']
    },
    maxSize: 20 * 1024 * 1024, // 20MB
    onDrop: acceptedFiles => setFile(acceptedFiles[0])
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!file) {
      toast({
        title: "Error",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    const data = new FormData();
    data.append('file', file);
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      console.log('Uploading file:', file.name);
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('Upload failed:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        });
        throw new Error(errorData?.error || 'Upload failed');
      }

      const responseData = await response.json();
      console.log('Upload successful:', responseData);

      toast({
        title: "Success!",
        description: "File uploaded successfully",
        variant: "default",
      });
      
      // Reset form
      setFile(null);
      setFormData({
        title: '',
        description: '',
        subject: '',
        price: ''
      });

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to upload file",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold">Upload Notes</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div {...getRootProps()} className="border-2 border-dashed p-8 text-center cursor-pointer">
            <input {...getInputProps()} />
            <p>Drag & drop notes (PDF/DOC), or click to select</p>
          </div>
          {file && <p>Selected: {file.name}</p>}
          <Input
            placeholder="Title"
            value={formData.title}
            onChange={e => setFormData({...formData, title: e.target.value})}
          />
          <Input
            placeholder="Description"
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
          />
          <Input
            placeholder="Subject"
            value={formData.subject}
            onChange={e => setFormData({...formData, subject: e.target.value})}
          />
          <Input
            type="number"
            placeholder="Price (INR)"
            value={formData.price}
            onChange={e => setFormData({...formData, price: e.target.value})}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Uploading..." : "Upload"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
