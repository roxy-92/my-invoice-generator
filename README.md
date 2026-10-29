# My Invoice Generator

A modern, responsive invoice generator built with **Angular, TypeScript, and SCSS**, designed to simplify the creation of Spanish invoices through automatic tax calculations, live previews, and PDF export.

The project aims to replace traditional spreadsheet-based invoicing with a more intuitive and efficient web application.

## Features

### Invoice Creation
- Add issuer and client information.
- Enter invoice numbers, issue dates, and payment details.
- Add, edit, and remove invoice items dynamically.
- Specify descriptions, quantities, unit prices, and discounts.
- Preview the invoice in real time.

### Spanish Tax Calculations
- Automatic calculation of taxable amounts.
- Support for applicable Spanish VAT (IVA) rates.
- Configurable personal income tax (IRPF) withholding.
- Automatic calculation of subtotals, taxes, and final amounts.
- Validation of invoice fields and calculations.

Tax rates and treatments depend on the transaction and taxpayer. The application will not assume that the same tax configuration applies to every invoice.

### Export and Data Management
- Generate professional, print-ready A4 PDF invoices.
- Export invoice data as JSON.
- Import previously exported JSON files to continue editing.
- Use the application without registration or a backend.

### User Interface
- Responsive design for desktop, tablet, and mobile.
- Dynamic forms with real-time validation.
- Live invoice preview.
- Clean and accessible interface.

## Tech Stack

| Technology | Purpose |
|---|---|
| Angular | Frontend framework |
| TypeScript | Application logic and type safety |
| SCSS | Styling and responsive layouts |
| Angular Reactive Forms | Dynamic forms and validation |
| Angular Signals | Reactive state and calculations |
| pdfmake | PDF document generation |
| GitHub Pages | Static application hosting |

## Project Goals

This project is designed to demonstrate practical frontend development skills, including:

- Building reusable Angular components.
- Managing complex forms with Reactive Forms and FormArray.
- Implementing business logic and financial calculations.
- Using Signals for reactive state management.
- Creating and exporting PDF documents.
- Handling JSON file import and export.
- Implementing responsive and accessible interfaces.
- Writing unit tests for tax calculations, rounding, and form validation.
- Deploying an Angular application using GitHub Pages.

## Planned Development

- [ ] Initialise the Angular project.
- [ ] Create the application layout and navigation.
- [ ] Implement issuer and client forms.
- [ ] Add dynamic invoice items.
- [ ] Implement tax calculations and validation.
- [ ] Build the live invoice preview.
- [ ] Implement PDF export.
- [ ] Add JSON import and export.
- [ ] Implement unit tests.
- [ ] Improve responsive design and accessibility.
- [ ] Deploy to GitHub Pages.

## Legal Disclaimer

This application is intended as a frontend development project and invoice drafting tool.

Although it aims to support Spanish invoicing fields and tax calculations, it has not been certified or verified as compliant with all applicable Spanish invoicing regulations, including SIF/VERI*FACTU requirements.

It should not be relied upon as legally compliant invoicing software without further assessment.

## License

This project is licensed under the MIT License.
