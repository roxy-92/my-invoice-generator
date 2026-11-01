# My Invoice Generator

A responsive invoice generator built with **Angular 22, TypeScript, and SCSS**, designed to simplify the creation of Spanish-style invoices through dynamic forms, automatic tax calculations, real-time previews, and PDF export.

The project was inspired by the limitations of managing invoices through spreadsheets. Its purpose is to explore a more intuitive, accessible, and efficient frontend solution while demonstrating modern Angular development practices.

## Key Features

### Responsive Design
- **Fully responsive interface** designed for desktop, tablet, and mobile devices.
- Adaptive layouts that accommodate different screen sizes.
- Responsive invoice forms and live preview.
- Dedicated **A4 print styles** to preserve document formatting when exporting to PDF.
- Consistent visual hierarchy and usability across devices.

### Form Validation
- **Angular Reactive Forms** with strongly typed form controls.
- Real-time validation of required fields and input formats.
- Custom validation for Spanish tax identification numbers.
- Email and Spanish postal code validation.
- **Conditional validation** based on the selected client type.
- Dynamic invoice items managed through `FormArray`.
- Prevention of PDF export when required information is missing or invalid.
- Automatic expansion of form sections containing validation errors.

### Invoice Management
- Editable issuer and client information.
- Custom issuer logo upload.
- Invoice numbering, issue dates, and configurable payment terms.
- Automatic payment due-date calculation.
- Dynamic invoice items with descriptions, quantities, and unit prices.
- Multiple payment methods: bank transfer, PayPal, Stripe, and Bizum.
- **Real-time invoice preview** synchronized with form changes.

### Tax Calculations
- Automatic calculation of subtotals and invoice totals.
- Spanish standard VAT (21%).
- Configurable IRPF withholding.
- Independent client type and tax treatment selection.
- Demonstration options for VAT exemptions, reverse-charge transactions, and operations outside the scope of Spanish VAT.
- Contextual tax notes based on the selected treatment.
- Centralized calculation logic separated from UI components.

### PDF Export
- Print-ready A4 invoice layout.
- PDF generation through the browser's native printing functionality.
- Dedicated print styles that exclude application controls.
- Validation before export.

## Tech Stack

| Technology | Purpose |
|---|---|
| **Angular 22** | Standalone components and application architecture |
| **TypeScript** | Strong typing and business logic |
| **SCSS** | Responsive layouts, component styling, and print styles |
| **Angular Reactive Forms** | Dynamic forms, conditional validation, and FormArray |
| **Angular Signals** | Reactive state management and computed values |
| **Angular Material** | UI components and interactions |
| **Vitest** | Unit testing |
| **Browser Print API** | A4 document printing and PDF export |

## Technical Highlights

This project demonstrates several practical frontend development concepts:

- **Component-based architecture:** Separation of invoice editing, preview rendering, and calculation logic.
- **Reactive state management:** Angular Signals and computed values keep the invoice preview and financial totals synchronized.
- **Complex form handling:** Nested form groups, dynamically managed items, custom validators, and conditional requirements.
- **Responsive UI development:** Adaptive layouts and SCSS media queries for different screen sizes.
- **Data modeling:** TypeScript interfaces for invoices, clients, issuers, and tax treatments.
- **Business logic separation:** Dedicated services for tax calculations, due dates, and PDF export.
- **User experience:** Immediate feedback, validation-aware exporting, and a live document preview.
- **Testing:** Automated unit tests using Vitest.

## Project Scope

My Invoice Generator is a **frontend-only portfolio project** that runs without a backend, database, or user authentication.

It focuses on invoice creation, responsive interface design, form validation, and financial calculations rather than persistent invoice storage or accounting management.

## Disclaimer

**DOCUMENTO DE DEMOSTRACIÓN · NO VÁLIDO PARA USO COMERCIAL**

This application is an experimental portfolio project intended for educational and demonstration purposes.

Its calculations, tax treatments, and legal notices have not been independently verified for commercial use. The application has not been assessed for compliance with all applicable Spanish invoicing regulations, including SIF/VERI*FACTU.

Generated documents are explicitly marked as demonstrations and must not be used as legally valid invoices.

## License

MIT License.