# ModelArena

## Project Overview
The **ModelArena** is an innovative web application built using **Next.js** and **TypeScript**, designed to explore and evaluate large language models (LMMs). This platform allows users to interact with various AI models, analyze their inference times, and estimate their associated costs. By integrating with **Hugging Face APIs**, the ModelArena empowers developers to test and compare AI models seamlessly, ensuring they can select the most suitable models for their use cases.

The project also leverages **TailwindCSS** for modern styling and **Redux** for robust state management.

---

## Research Goals and Purpose

The ModelArena is more than just a demo application—it's a **research tool** aimed at solving critical challenges in AI development and integration:

### **Key Objectives**
1. **Comparing Multiple Models**  
   Developers often struggle to choose the right AI model for their application. This platform provides a unified space to evaluate and compare different models across:
   - **Performance Metrics**: Analyze latency, throughput, and accuracy.
   - **Inference Costs**: Calculate API costs for each interaction.
   - **Specialization**: Understand the strengths of each model for specific use cases.

2. **Reducing Development Friction**  
   By integrating multiple models under one platform, developers can:
   - Quickly test different models without needing to set up individual APIs.
   - Experiment with different configurations and prompts.
   - Use helper utilities for generating consistent results.

3. **Supporting Research and Prototyping**  
   The playground is designed to support AI researchers, students, and developers in quickly testing cutting-edge models. The ability to easily switch between models enables iterative experimentation and rapid prototyping.

4. **Simplifying Cost Analysis**  
   Understanding the financial implications of using specific AI models is critical for businesses. The platform provides tools to estimate API usage costs, helping teams make cost-effective decisions.

---

## App Structure

The application is structured as follows:

### **Root Directory**
- **`tsconfig.json`**: TypeScript configuration file.
- **`.env`**: Contains API keys and sensitive information for secure integrations.
- **`.gitignore`**: Specifies files to be ignored by Git.
- **`eslint.config.mjs`**: Linting configuration for consistent code quality.
- **`next.config.ts`**: Configures the Next.js application settings.
- **`postcss.config.mjs`**: PostCSS configuration for styling with TailwindCSS.
- **`tailwind.config.ts`**: TailwindCSS configuration.
- **`package.json`**: Lists project dependencies and scripts.
- **`README.md`**: Documentation (this file).

### **`/public` Directory**
Contains static assets such as logos, icons, and model illustrations.

### **`/src` Directory**
#### **`/app`**
Holds application pages:
- **`layout.tsx`**: Defines the application's layout and navigation structure.
- **`page.tsx`**: The homepage showcasing features and functionalities.
- **`ai-prompt/page.tsx`**: Dedicated page for AI prompt interactions and testing.

#### **`/commonElements`**
Reusable UI components for maintaining a consistent user experience:
- **`Button`**
- **`Checkbox`**
- **`Image`**
- **`Input`**

#### **`/components`**
Functional components grouped by feature or page:
- **`Page/AiPromptPage`**: Components specific to the AI prompt testing page.
- **`Page/HomePage`**: Components specific to the homepage.
- **`TypeWriterAnimation`**: Handles dynamic typewriter-style animations for better user engagement.

#### **`/config`**
Configuration files for managing application settings:
- **`aiModelData.tsx`**: A centralized configuration file for defining available AI models and their metadata.
- **`config.tsx`**: Contains global configurations.

#### **`/helper`**
Utilities and helper functions:
- **`HfHelper.tsx`**: Functions to interact with Hugging Face models, handling API requests and responses.

#### **`/interface`**
Defines TypeScript interfaces for application data structures:
- **`models.tsx`**: Interfaces for AI models and related data.

#### **`/layout`**
Components for the app’s layout, including the **Header** and **Sidebar**.

#### **`/redux`**
Manages application state with Redux:
- **`store.tsx`**: Configures the Redux store.
- **`reducers`**: Manages state slices, including models, prompts, and cost analysis.

#### **`/styles`**
Contains global and custom CSS for the application's visual design.

---

## How to Run the Project

### **Prerequisites**
Ensure you have the following installed:
- **Node.js** (version 16 or higher)
- npm or yarn package manager

### **Steps**
1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd ModelArena
   ```

2.	Install dependencies:

      ```bash
      npm install
      ```

3.	Run the development server:

      ```bash
      npm run dev
      ```


> The app will be accessible at `http://localhost:3000`.


4.	Build the project for production:

      ```bash
      npm run build
      ```

This will generate optimized files in the .next directory.

5.	Start the production server:

      ```bash
      npm run start
      ```

### How to Add a Model in aiModelData.tsx

To add a new AI model:
	1.	Open the aiModelData.tsx file in the src/config directory.
	2.	Add an object to the models array with the following structure:

      ```
      {
         id: 'unique_model_id',
         name: 'Model Name',
         image: 'path to image',
         model: 'Hugging Face model name',
      }
      ```

#### Example:

      ```
      {
         id: 1,
         name: 'QwenAI 2.5',
         image: '/qwen-icon.png',
         model: 'Qwen/Qwen2.5-72B-Instruct',
      }
      ```

	3.	Save the file and restart the server to reflect the changes.

### Research and Development Focus

The ModelArena is specifically designed for:
	1.	Evaluating Model Suitability
	•	Identify which models excel in specific domains, such as conversational AI, summarization, or question answering.
	•	Compare models based on speed, accuracy, and cost.
	2.	Enabling Seamless Integration
	•	Quickly test APIs without complex configurations.
	•	Use intuitive prompts to evaluate model performance.
	3.	Cost and Latency Analysis
	•	Measure inference times for various models.
	•	Estimate API usage costs to aid budget planning.
	4.	Empowering Developers and Researchers
	•	Provide an easy-to-use interface for testing LMMs.
	•	Offer detailed analytics for informed decision-making.

This playground bridges the gap between cutting-edge AI technology and practical implementation, empowering developers to innovate and build smarter solutions effortlessly.
