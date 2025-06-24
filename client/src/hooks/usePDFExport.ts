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
        overflow: element.style.overflow,
        position: element.style.position,
      };

      // Set optimal styles for PDF rendering
      element.style.width = '794px'; // A4 width at 96 DPI
      element.style.maxWidth = '794px';
      element.style.transform = 'scale(1)';
      element.style.transformOrigin = 'top left';
      element.style.overflow = 'visible';
      element.style.position = 'relative';

      // Apply specific styles to prevent collapsing
      const allElements = element.querySelectorAll('*');
      const originalElementStyles: Map<Element, any> = new Map();
      
      allElements.forEach((el: Element) => {
        const htmlEl = el as HTMLElement;
        originalElementStyles.set(el, {
          minHeight: htmlEl.style.minHeight,
          height: htmlEl.style.height,
          overflow: htmlEl.style.overflow,
          wordBreak: htmlEl.style.wordBreak,
          whiteSpace: htmlEl.style.whiteSpace,
        });
        
        // Prevent collapsing
        if (htmlEl.style.height !== 'auto' && !htmlEl.style.height) {
          htmlEl.style.minHeight = '1em';
        }
        htmlEl.style.overflow = 'visible';
        htmlEl.style.wordBreak = 'break-word';
        htmlEl.style.whiteSpace = 'normal';
      });

      // Wait for layout to stabilize
      await new Promise(resolve => setTimeout(resolve, 300));

      // Configure html2canvas with optimized settings
      const canvas = await html2canvas(element, {
        scale: 2, // Good balance of quality and performance
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: 794,
        height: element.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        foreignObjectRendering: true, // Better for text and SVG
        imageTimeout: 0,
        removeContainer: false,
        ignoreElements: (element) => {
          // Ignore certain elements that might cause issues
          return element.classList.contains('no-print') || 
                 element.tagName === 'SCRIPT' || 
                 element.tagName === 'STYLE';
        },
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById('resume-preview');
          if (clonedElement) {
            // Ensure consistent font and styling
            clonedElement.style.fontFamily = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif';
            clonedElement.style.fontSize = '14px';
            clonedElement.style.lineHeight = '1.5';
            clonedElement.style.color = '#000000';
            clonedElement.style.backgroundColor = '#ffffff';
            clonedElement.style.width = '794px';
            clonedElement.style.maxWidth = '794px';
            
            // Fix any collapsed elements
            const allClonedElements = clonedElement.querySelectorAll('*');
            allClonedElements.forEach((el: Element) => {
              const htmlEl = el as HTMLElement;
              htmlEl.style.overflow = 'visible';
              htmlEl.style.wordBreak = 'break-word';
              htmlEl.style.whiteSpace = 'normal';
              
              // Ensure minimum heights for content areas
              if (htmlEl.textContent && htmlEl.textContent.trim() && !htmlEl.style.height) {
                htmlEl.style.minHeight = '1em';
              }
            });
          }
        },
      });

      // Restore original styles
      Object.assign(element.style, originalStyles);
      allElements.forEach((el: Element) => {
        const htmlEl = el as HTMLElement;
        const original = originalElementStyles.get(el);
        if (original) {
          Object.assign(htmlEl.style, original);
        }
      });

      // Restore original styles
      Object.assign(element.style, originalStyles);

      // A4 dimensions in mm
      const pdfWidth = 210;
      const pdfHeight = 297;
      
      // Calculate optimal scaling
      const canvasWidthMM = (canvas.width / 2) * 0.264583; // Convert pixels to mm at scale 2
      const canvasHeightMM = (canvas.height / 2) * 0.264583;
      
      // Calculate scaling to fit A4 width with margins
      const marginMM = 10; // 10mm margins on each side
      const availableWidth = pdfWidth - (2 * marginMM);
      const scale = availableWidth / canvasWidthMM;
      
      const finalWidth = canvasWidthMM * scale;
      const finalHeight = canvasHeightMM * scale;

      // Create PDF with high quality settings
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: false,
      });

      // Convert canvas to high quality image
      const imgData = canvas.toDataURL('image/png', 1.0);

      // Calculate how many pages we need
      const availableHeight = pdfHeight - (2 * marginMM);
      
      if (finalHeight <= availableHeight) {
        // Single page - center it
        const yPosition = marginMM;
        pdf.addImage(imgData, 'PNG', marginMM, yPosition, finalWidth, finalHeight, undefined, 'SLOW');
      } else {
        // Multiple pages
        let heightLeft = finalHeight;
        let yOffset = 0;
        let pageNumber = 0;
        
        while (heightLeft > 0) {
          if (pageNumber > 0) {
            pdf.addPage();
          }
          
          const pageHeight = Math.min(heightLeft, availableHeight);
          
          // Calculate source coordinates for this page
          const sourceY = (yOffset / finalHeight) * canvas.height;
          const sourceHeight = (pageHeight / finalHeight) * canvas.height;
          
          // Create a temporary canvas for this page section
          const tempCanvas = document.createElement('canvas');
          const tempCtx = tempCanvas.getContext('2d');
          tempCanvas.width = canvas.width;
          tempCanvas.height = sourceHeight;
          
          if (tempCtx) {
            tempCtx.drawImage(canvas, 0, sourceY, canvas.width, sourceHeight, 0, 0, canvas.width, sourceHeight);
            const tempImgData = tempCanvas.toDataURL('image/png', 1.0);
            pdf.addImage(tempImgData, 'PNG', marginMM, marginMM, finalWidth, pageHeight, undefined, 'SLOW');
          }
          
          heightLeft -= availableHeight;
          yOffset += availableHeight;
          pageNumber++;
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
