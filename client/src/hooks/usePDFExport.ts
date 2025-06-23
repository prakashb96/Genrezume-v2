import { useCallback } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function usePDFExport() {
  const exportToPDF = useCallback(async (filename?: string) => {
    const element = document.getElementById('resume-preview');
    if (!element) {
      throw new Error('Resume preview element not found');
    }

    try {
      // Store original styles
      const originalStyles = {
        width: element.style.width,
        height: element.style.height,
        transform: element.style.transform,
        maxWidth: element.style.maxWidth,
      };

      // Temporarily set styles for better PDF rendering
      element.style.width = '210mm';
      element.style.maxWidth = '210mm';
      element.style.transform = 'scale(1)';
      element.style.transformOrigin = 'top left';

      // Wait for styles to apply
      await new Promise(resolve => setTimeout(resolve, 100));

      // Configure html2canvas with optimized settings for text clarity
      const canvas = await html2canvas(element, {
        scale: 3, // Higher scale for crisp text
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: element.offsetWidth,
        height: element.offsetHeight,
        scrollX: 0,
        scrollY: 0,
        foreignObjectRendering: false, // Better text rendering
        imageTimeout: 0,
        removeContainer: true,
        onclone: (clonedDoc) => {
          // Ensure fonts are loaded in cloned document
          const clonedElement = clonedDoc.getElementById('resume-preview');
          if (clonedElement) {
            clonedElement.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif';
            clonedElement.style.setProperty('-webkit-font-smoothing', 'antialiased');
            clonedElement.style.color = 'black';
            clonedElement.style.backgroundColor = 'white';
          }
        },
      });

      // Restore original styles
      Object.assign(element.style, originalStyles);

      // A4 dimensions in mm
      const pdfWidth = 210;
      const pdfHeight = 297;
      
      // Calculate scaling to fit A4
      const canvasAspectRatio = canvas.height / canvas.width;
      const imgWidth = pdfWidth;
      const imgHeight = imgWidth * canvasAspectRatio;

      // Create PDF with high quality settings
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: false, // Better quality
      });

      // Convert canvas to high quality image - using PNG for better text clarity
      const imgData = canvas.toDataURL('image/png');

      // Add image to PDF
      if (imgHeight <= pdfHeight) {
        // Single page
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, undefined, 'SLOW');
      } else {
        // Multiple pages
        let heightLeft = imgHeight;
        let position = 0;
        
        while (heightLeft > 0) {
          const pageHeight = Math.min(heightLeft, pdfHeight);
          
          if (position > 0) {
            pdf.addPage();
          }
          
          pdf.addImage(
            imgData, 
            'PNG', 
            0, 
            -position, 
            imgWidth, 
            imgHeight, 
            undefined, 
            'SLOW'
          );
          
          heightLeft -= pdfHeight;
          position += pdfHeight;
        }
      }

      // Generate filename with timestamp
      const timestamp = new Date().toISOString().split('T')[0] + '_' + Date.now();
      const defaultFilename = filename || `resume_${timestamp}.pdf`;
      
      // Save the PDF
      pdf.save(defaultFilename);
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw new Error('Failed to generate PDF. Please try again.');
    }
  }, []);

  return { exportToPDF };
}
