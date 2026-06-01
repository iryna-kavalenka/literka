describe('OCR upload flow', () => {
  it('should upload an image and display extracted text', () => {
    cy.intercept('POST', '/api/ocr', {
      statusCode: 200,
      body: {
        foundText: true,
        text: 'Hello world',
        message: 'Text detected successfully',
      },
    }).as('ocrUpload');

    cy.visit('/');
    cy.contains('Image OCR Upload');
    cy.contains('Select from device');

    const svgData =
      '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"><rect width="1" height="1" fill="#000"/></svg>';
    const blob = new Blob([svgData], { type: 'image/png' });
    const file = new File([blob], 'test.png', { type: 'image/png' });

    cy.get('input[type="file"]').then((input) => {
      const el = input[0] as HTMLInputElement;
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      el.files = dataTransfer.files;
      cy.wrap(el).trigger('change', { force: true });
    });

    cy.wait('@ocrUpload');
    cy.contains('Text detected successfully');
    cy.contains('Hello world');
  });
});
