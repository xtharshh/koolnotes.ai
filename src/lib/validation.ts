export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export const validateUpload = async (file: File): Promise<ValidationResult> => {
  // Check if file exists
  if (!file) {
    return { valid: false, error: 'No file provided' };
  }

  // Validate file type
  const validTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  
  if (!validTypes.includes(file.type)) {
    return { 
      valid: false, 
      error: 'Invalid file type. Only PDF and DOC/DOCX files are allowed.' 
    };
  }

  // Validate file size (max 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB in bytes
  if (file.size > maxSize) {
    return { 
      valid: false, 
      error: 'File size too large. Maximum size is 10MB.' 
    };
  }

  // Basic content validation
  try {
    const firstChunk = file.slice(0, 4);
    const buffer = await firstChunk.arrayBuffer();
    const header = new Uint8Array(buffer);
    
    // Check PDF header
    if (file.type === 'application/pdf' && 
        (header[0] !== 0x25 || header[1] !== 0x50 || 
         header[2] !== 0x44 || header[3] !== 0x46)) {
      return { 
        valid: false, 
        error: 'Invalid PDF file content.' 
      };
    }

    // For DOC files, could add similar checks for DOC/DOCX headers
    
    return { valid: true };
  } catch (error:unknown) {
    console.error('Error validating file content:', error);
    return { 
      valid: false, 
      error: 'Could not validate file content.' 
    };
  }
};
