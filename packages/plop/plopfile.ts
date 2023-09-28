import type { NodePlopAPI } from "plop";
import { fileURLToPath } from "url";
import * as fs from "fs/promises";
import * as path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// NOTE: Declare any additional modules here
const PACKAGES_RELATIVE_PATHS_CONFIG = [
  path.resolve(__dirname, "../../apps/web-app"),
  path.resolve(__dirname, "../ui"),
  path.resolve(__dirname, "../utils"),
];

const AUTO_EXPORT_PATTERN_LINE =
  "// DO NOT EDIT: File generated automatically!";

function toPascalCase(str: string) {
  return `${str.trim()}`
    .replace(new RegExp(/[-_]+/, "g"), " ")
    .replace(new RegExp(/[^\w\s]/, "g"), "")
    .replace(
      new RegExp(/\s+(.)(\w*)/, "g"),
      ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
    )
    .replace(new RegExp(/\w/), (s) => s.toUpperCase());
}

function toCamelCase(str: string) {
  return str
    .replace(/\s(.)/g, (s) => s.toUpperCase())
    .replace(/\s/g, "")
    .replace(/^(.)/, (b) => b.toLowerCase());
}

async function getChildDirectories(sourcePath: string) {
  const dirContent = await fs.readdir(sourcePath, { withFileTypes: true });

  return dirContent
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

function stringsToChoicesList(strList: string[] = []) {
  return strList.map((val) => ({ name: val, value: val }));
}

async function getNamespaces(baseDir: string) {
  const namespaces = await getChildDirectories(
    path.resolve(baseDir, "./components")
  );

  return namespaces;
}

async function getComponentsInNamespace(baseDir: string, namespace: string) {
  const components = await getChildDirectories(
    path.resolve(baseDir, `./components/${namespace}`)
  );
  return components;
}

function validateInput(
  input: string,
  inputDisplayName: string,
  choices?: string[]
) {
  if (!input) return `${inputDisplayName} must have name!`;

  if (choices != null && choices.find((str) => str === input)) {
    return `${inputDisplayName} name must be unique!`;
  }

  return true;
}

function displayIntro() {
  console.log(`
  ██╗   ██╗███████╗███████╗
  ██║   ██║██╔════╝██╔════╝
  ██║   ██║█████╗  █████╗  
  ██║   ██║██╔══╝  ██╔══╝  
  ╚██████╔╝██║     ██║     
   ╚═════╝ ╚═╝     ╚═╝     
    _                      
  >(.)__  CODE GENERATOR   
   (___/ ================= 
  `);
}

export default function initPlop(plop: NodePlopAPI) {
  const projectDirPrompt = {
    type: "list",
    name: "projectDir",
    message: "Please select project's directory",
    choices: stringsToChoicesList(PACKAGES_RELATIVE_PATHS_CONFIG),
  };

  displayIntro();

  plop.setGenerator("Component", {
    description: "React component",
    prompts: [
      projectDirPrompt,
      {
        type: "confirm",
        name: "shouldAddNamespace",
        message: async (answers) => {
          const currentNamespaces = await getNamespaces(answers["projectDir"]);

          return (
            "Should a new namespace be added to currently existing (" +
            currentNamespaces.join(", ") +
            ")?"
          );
        },
        default: false,
      },
      {
        type: "input",
        name: "namespace",
        message: "Please enter name for the namespace",
        when: (answers) => answers["shouldAddNamespace"],
        validate: async (input, answers) => {
          if (!answers) return false;
          const namespaces = await getNamespaces(answers["projectDir"]);
          return validateInput(toCamelCase(input), "Namespace", namespaces);
        },
      },
      {
        type: "list",
        name: "namespace",
        message: "Please select component's namespace",
        when: (answers) => !answers["shouldAddNamespace"],
        choices: async ({ projectDir }) =>
          stringsToChoicesList(await getNamespaces(projectDir)),
      },
      {
        type: "input",
        name: "name",
        message: "Please enter name for the component",
        validate: async (input, answers) => {
          if (!answers) return false;
          if (answers["shouldAddNamespace"]) return true;

          const componentsInNamespace = await getComponentsInNamespace(
            answers["projectDir"],
            answers["namespace"]
          );

          return validateInput(
            toPascalCase(input),
            "Component",
            componentsInNamespace
          );
        },
      },
    ],
    actions: (answers) => {
      const actionsList = [
        answers &&
          answers["shouldAddNamespace"] && {
            type: "add",
            path: "{{ projectDir }}/components/{{camelCase namespace}}/index.ts",
            templateFile: "plop-templates/namespace/index.ts.hbs",
          },
        {
          type: "append",
          path: "{{ projectDir }}/components/{{ namespace }}/index.ts",
          pattern: AUTO_EXPORT_PATTERN_LINE,
          template: `export { default as {{ pascalCase name }} } from "./{{ pascalCase name }}";`,
        },
        {
          type: "add",
          path: "{{ projectDir }}/components/{{namespace}}/{{pascalCase name}}/{{pascalCase name}}.tsx",
          templateFile: "plop-templates/component/Component.tsx.hbs",
        },
        {
          type: "add",
          path: "{{ projectDir }}/components/{{namespace}}/{{pascalCase name}}/{{pascalCase name}}.styled.ts",
          templateFile: "plop-templates/component/Component.styled.ts.hbs",
        },
        {
          type: "add",
          path: "{{ projectDir }}/components/{{namespace}}/{{pascalCase name}}/{{pascalCase name}}.test.tsx",
          templateFile: "plop-templates/component/Component.test.tsx.hbs",
        },
        {
          type: "add",
          path: "{{ projectDir }}/components/{{namespace}}/{{pascalCase name}}/{{pascalCase name}}.stories.tsx",
          templateFile: "plop-templates/component/Component.stories.tsx.hbs",
        },
        {
          type: "add",
          path: "{{ projectDir }}/components/{{namespace}}/{{pascalCase name}}/index.ts",
          templateFile: "plop-templates/component/index.ts.hbs",
        },
      ];

      return actionsList.filter(Boolean);
    },
  });

  plop.setGenerator("Hook", {
    description: "React hook",
    prompts: [
      projectDirPrompt,
      {
        type: "input",
        name: "name",
        message:
          'Please enter name for the hook (remember to start with "use", e.g. useExample!)',
        validate: async (input, answers) => {
          if (!answers) return false;

          const hookName = toCamelCase(input);
          const hookPrefix = "use";

          if (
            hookName.length <= hookPrefix.length ||
            !hookName.startsWith(hookPrefix)
          ) {
            return "Incorrect hook name!";
          }

          const hooks = await getChildDirectories(
            path.resolve(answers["projectDir"], `./hooks`)
          );

          return validateInput(hookName, "Hook", hooks);
        },
      },
    ],
    actions: [
      {
        type: "add",
        path: "{{ projectDir }}/hooks/{{camelCase name}}/{{camelCase name}}.ts",
        templateFile: "plop-templates/hook/hook.ts.hbs",
      },
      {
        type: "add",
        path: "{{ projectDir }}/hooks/{{camelCase name}}/{{camelCase name}}.test.ts",
        templateFile: "plop-templates/hook/hook.test.ts.hbs",
      },
      {
        type: "add",
        path: "{{ projectDir }}/hooks/{{camelCase name}}/index.ts",
        templateFile: "plop-templates/hook/index.ts.hbs",
      },
      {
        type: "append",
        path: "{{ projectDir }}/hooks/index.ts",
        pattern: AUTO_EXPORT_PATTERN_LINE,
        template: `export { default as {{ camelCase name }} } from "./{{ camelCase name }}";`,
      },
    ],
  });

  plop.setGenerator("Store", {
    description: "Zustand store",
    prompts: [
      projectDirPrompt,
      {
        type: "input",
        name: "name",
        message:
          'Please enter name for the store (remember to end with "Store", eg. "ExampleStore"!)',
        validate: async (input, answers) => {
          if (!answers) return false;

          const storeName = toPascalCase(input);
          const storeSuffix = "Store";

          if (
            storeName.length <= storeSuffix.length ||
            !storeName.endsWith(storeSuffix)
          ) {
            return "Incorrect store name!";
          }

          const stores = await getChildDirectories(
            path.resolve(answers["projectDir"], `./stores`)
          );

          return validateInput(storeName, "Store", stores);
        },
      },
    ],
    actions: [
      {
        type: "add",
        path: "{{ projectDir }}/stores/{{camelCase name}}/{{camelCase name}}.ts",
        templateFile: "plop-templates/store/store.ts.hbs",
      },
      {
        type: "add",
        path: "{{ projectDir }}/stores/{{camelCase name}}/{{camelCase name}}.test.ts",
        templateFile: "plop-templates/store/store.test.tsx.hbs",
      },
      {
        type: "add",
        path: "{{ projectDir }}/stores/{{camelCase name}}/index.ts",
        templateFile: "plop-templates/store/index.ts.hbs",
      },
      {
        type: "append",
        path: "{{ projectDir }}/stores/index.ts",
        pattern: AUTO_EXPORT_PATTERN_LINE,
        template: `export * as {{ camelCase name }} from "./{{ camelCase name }}";`,
      },
    ],
  });

  plop.setGenerator("Helper", {
    description: "Utility helper function",
    prompts: [
      projectDirPrompt,
      {
        type: "input",
        name: "name",
        message: "Please enter name for the helper",
        validate: async (input, answers) => {
          if (!answers) return false;

          const helpers = await getChildDirectories(
            path.resolve(answers["projectDir"], `./helpers`)
          );

          return validateInput(toCamelCase(input), "Helper", helpers);
        },
      },
    ],
    actions: [
      {
        type: "add",
        path: "{{ projectDir }}/helpers/{{camelCase name}}/{{camelCase name}}.ts",
        templateFile: "plop-templates/helper/helper.ts.hbs",
      },
      {
        type: "add",
        path: "{{ projectDir }}/helpers/{{camelCase name}}/{{camelCase name}}.test.ts",
        templateFile: "plop-templates/helper/helper.test.ts.hbs",
      },
      {
        type: "add",
        path: "{{ projectDir }}/helpers/{{camelCase name}}/index.ts",
        templateFile: "plop-templates/helper/index.ts.hbs",
      },
      {
        type: "append",
        path: "{{ projectDir }}/helpers/index.ts",
        pattern: AUTO_EXPORT_PATTERN_LINE,
        template: `export { default as {{ camelCase name }} } from "./{{ camelCase name }}";`,
      },
    ],
  });
}
