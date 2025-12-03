// Language configurations for Piston API
const languageConfigs = {
    python: { 
        language: 'python', 
        version: '3.10.0', 
        defaultCode: `# Python Example
name = input("Enter your name: ")
age = input("Enter your age: ")
print(f"Hello {name}! You are {age} years old.")

# Loop example
for i in range(1, 6):
    print(f"Number: {i}")`,
        monacoLang: 'python'
    },
    javascript: { 
        language: 'javascript', 
        version: '18.15.0', 
        defaultCode: `// JavaScript Example
console.log("Hello from JavaScript!");

// Loop example
const numbers = [1, 2, 3, 4, 5];
numbers.forEach(num => console.log(\`Number: \${num}\`));`,
        monacoLang: 'javascript'
    },
    java: { 
        language: 'java', 
        version: '15.0.2', 
        defaultCode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        System.out.println("Hello from Java!");
        
        // Loop example
        for(int i = 1; i <= 5; i++) {
            System.out.println("Number: " + i);
        }
        
        // Input example
        System.out.print("Enter your name: ");
        String name = sc.nextLine();
        System.out.println("Hello, " + name + "!");
    }
}`,
        monacoLang: 'java'
    },
    cpp: { 
        language: 'c++', 
        version: '10.2.0', 
        defaultCode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    cout << "Hello from C++!" << endl;
    
    // Loop example
    for(int i = 1; i <= 5; i++) {
        cout << "Number: " << i << endl;
    }
    
    // Input example
    string name;
    cout << "Enter your name: ";
    getline(cin, name);
    cout << "Hello, " << name << "!" << endl;
    
    return 0;
}`,
        monacoLang: 'cpp'
    },
    c: { 
        language: 'c', 
        version: '10.2.0', 
        defaultCode: `#include <stdio.h>
#include <string.h>

int main() {
    printf("Hello from C!\\n");
    
    // Loop example
    for(int i = 1; i <= 5; i++) {
        printf("Number: %d\\n", i);
    }
    
    // Input example
    char name[100];
    printf("Enter your name: ");
    fgets(name, sizeof(name), stdin);
    name[strcspn(name, "\\n")] = 0;
    printf("Hello, %s!\\n", name);
    
    return 0;
}`,
        monacoLang: 'c'
    },
    go: { 
        language: 'go', 
        version: '1.16.2', 
        defaultCode: `package main
import (
    "fmt"
    "bufio"
    "os"
)

func main() {
    fmt.Println("Hello from Go!")
    
    // Loop example
    for i := 1; i <= 5; i++ {
        fmt.Printf("Number: %d\\n", i)
    }
    
    // Input example
    reader := bufio.NewReader(os.Stdin)
    fmt.Print("Enter your name: ")
    name, _ := reader.ReadString('\\n')
    fmt.Printf("Hello, %s", name)
}`,
        monacoLang: 'go'
    },
    rust: { 
        language: 'rust', 
        version: '1.68.2', 
        defaultCode: `use std::io;

fn main() {
    println!("Hello from Rust!");
    
    // Loop example
    for i in 1..=5 {
        println!("Number: {}", i);
    }
    
    // Input example
    println!("Enter your name:");
    let mut name = String::new();
    io::stdin().read_line(&mut name).expect("Failed");
    print!("Hello, {}", name);
}`,
        monacoLang: 'rust'
    },
    php: { 
        language: 'php', 
        version: '8.2.3', 
        defaultCode: `<?php
echo "Hello from PHP!\\n";

// Loop example
for($i = 1; $i <= 5; $i++) {
    echo "Number: $i\\n";
}

// Input example
echo "Enter your name: ";
$name = trim(fgets(STDIN));
echo "Hello, $name!\\n";
?>`,
        monacoLang: 'php'
    },
    ruby: { 
        language: 'ruby', 
        version: '3.0.1', 
        defaultCode: `puts "Hello from Ruby!"

# Loop example
5.times do |i|
  puts "Number: #{i + 1}"
end

# Input example
print "Enter your name: "
name = gets.chomp
puts "Hello, #{name}!"`,
        monacoLang: 'ruby'
    }
};

// Global variables
let editor;
let currentLanguage = 'python';

// DOM Elements
const languageSelect = document.getElementById('languageSelect');
const runBtn = document.getElementById('runBtn');
const clearBtn = document.getElementById('clearBtn');
const formatBtn = document.getElementById('formatBtn');
const outputArea = document.getElementById('output');
const statusDot = document.querySelector('.status-dot');
const statusText = document.querySelector('.status-text');
const loadingOverlay = document.getElementById('loadingOverlay');
const copyOutput = document.getElementById('copyOutput');

// Modal elements
const inputModal = document.getElementById('inputModal');
const modalInputArea = document.getElementById('modalInputArea');
const submitInputBtn = document.getElementById('submitInputBtn');
const cancelInputBtn = document.getElementById('cancelInputBtn');

// Initialize Monaco Editor
require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs' } });

require(['vs/editor/editor.main'], function () {
    editor = monaco.editor.create(document.getElementById('monacoEditor'), {
        value: languageConfigs[currentLanguage].defaultCode,
        language: languageConfigs[currentLanguage].monacoLang,
        theme: 'vs-dark',
        fontSize: 15,
        minimap: { enabled: true },
        scrollBeyondLastLine: false,
        automaticLayout: true,
        lineNumbers: 'on',
        roundedSelection: true,
        cursorBlinking: 'smooth',
        cursorSmoothCaretAnimation: true,
        scrollbar: {
            vertical: 'visible',
            horizontal: 'visible',
            useShadows: true,
            verticalScrollbarSize: 10,
            horizontalScrollbarSize: 10
        },
        folding: true
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, function () {
        runCode();
    });
});

// Update status function
function updateStatus(text, type) {
    statusText.textContent = text;
    
    switch(type) {
        case 'error':
            statusDot.style.background = '#ef4444';
            break;
        case 'success':
            statusDot.style.background = '#10b981';
            break;
        case 'loading':
            statusDot.style.background = '#f59e0b';
            break;
        default:
            statusDot.style.background = '#10b981';
    }
}

// Language change handler
languageSelect.addEventListener('change', (e) => {
    currentLanguage = e.target.value;
    const config = languageConfigs[currentLanguage];
    
    if (editor) {
        monaco.editor.setModelLanguage(editor.getModel(), config.monacoLang);
        editor.setValue(config.defaultCode);
    }
    
    updateStatus('Ready', 'normal');
});

// Check if code needs input
function needsInput(code) {
    const inputPatterns = [
        /input\s*\(/i,              // Python input()
        /scanf\s*\(/i,              // C scanf()
        /cin\s*>>/i,                // C++ cin
        /Scanner/i,                 // Java Scanner
        /readLine\s*\(/i,           // Various readLine
        /ReadString\s*\(/i,         // Go ReadString
        /read_line\s*\(/i,          // Rust read_line
        /fgets\s*\(/i,              // C/PHP fgets
        /gets/i,                    // Ruby gets
        /STDIN/i                    // General STDIN
    ];
    
    return inputPatterns.some(pattern => pattern.test(code));
}

// Show input modal
function showInputModal() {
    inputModal.classList.remove('hidden');
    modalInputArea.value = '';
    modalInputArea.focus();
}

// Hide input modal
function hideInputModal() {
    inputModal.classList.add('hidden');
}

// Run code function
async function runCode() {
    const code = editor.getValue().trim();
    
    if (!code) {
        showOutput('⚠️ Error: Please write some code first!', 'error');
        return;
    }

    // Check if code needs input
    if (needsInput(code)) {
        showInputModal();
        return;
    }

    // Execute code without input
    executeCode(code, '');
}

// Execute code with or without input
async function executeCode(code, userInput) {
    hideInputModal();
    loadingOverlay.classList.remove('hidden');
    updateStatus('Running...', 'loading');

    try {
        const config = languageConfigs[currentLanguage];
        
        const requestBody = {
            language: config.language,
            version: config.version,
            files: [{
                content: code
            }]
        };

        if (userInput) {
            requestBody.stdin = userInput;
        }

        const response = await fetch('https://emkc.org/api/v2/piston/execute', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
        }

        const result = await response.json();
        loadingOverlay.classList.add('hidden');

        if (result.run) {
            if (result.run.stderr) {
                const errorOutput = `❌ Error:\n${result.run.stderr}`;
                showOutput(errorOutput, 'error');
                updateStatus('Error', 'error');
            } else if (result.run.stdout) {
                const successOutput = `✅ Output:\n${result.run.stdout}`;
                showOutput(successOutput, 'success');
                updateStatus('Success', 'success');
            } else {
                showOutput('✅ Code executed successfully with no output.', 'success');
                updateStatus('Success', 'success');
            }
        } else {
            throw new Error('Unexpected API response format');
        }

    } catch (error) {
        loadingOverlay.classList.add('hidden');
        let errorMessage = `❌ Compilation Error:\n${error.message}\n\n`;
        
        if (error.message.includes('Failed to fetch')) {
            errorMessage += 'Network Error: Unable to connect to the compiler API.\nPlease check your internet connection and try again.';
        } else if (error.message.includes('HTTP Error')) {
            errorMessage += 'API Error: The compiler service is temporarily unavailable.\nPlease try again in a few moments.';
        } else {
            errorMessage += 'Please check your code and try again.';
        }
        
        showOutput(errorMessage, 'error');
        updateStatus('Failed', 'error');
        console.error('Detailed Error:', error);
    }
}

// Show output function
function showOutput(text, type) {
    outputArea.innerHTML = '';
    const pre = document.createElement('pre');
    pre.textContent = text;
    pre.className = type === 'error' ? 'output-error' : 'output-success';
    outputArea.appendChild(pre);
}

// Clear code function
function clearCode() {
    if (editor) {
        editor.setValue(languageConfigs[currentLanguage].defaultCode);
    }
    outputArea.innerHTML = `
        <div class="output-placeholder">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="currentColor" opacity="0.3">
                <path d="M32 8L56 20v24L32 56L8 44V20L32 8z"/>
            </svg>
            <p>Run your code to see the output</p>
        </div>
    `;
    updateStatus('Ready', 'normal');
}

// Format code function
function formatCode() {
    if (editor) {
        editor.getAction('editor.action.formatDocument').run();
    }
}

// Copy output function
function copyOutputText() {
    const outputText = outputArea.textContent;
    if (outputText && !outputText.includes('Run your code')) {
        navigator.clipboard.writeText(outputText)
            .then(() => {
                const originalHTML = copyOutput.innerHTML;
                copyOutput.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/></svg>';
                setTimeout(() => {
                    copyOutput.innerHTML = originalHTML;
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy:', err);
            });
    }
}

// Event listeners
runBtn.addEventListener('click', runCode);
clearBtn.addEventListener('click', clearCode);
formatBtn.addEventListener('click', formatCode);
copyOutput.addEventListener('click', copyOutputText);

// Modal event listeners
submitInputBtn.addEventListener('click', () => {
    const code = editor.getValue().trim();
    const userInput = modalInputArea.value;
    executeCode(code, userInput);
});

cancelInputBtn.addEventListener('click', () => {
    hideInputModal();
    updateStatus('Cancelled', 'normal');
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !inputModal.classList.contains('hidden')) {
        hideInputModal();
    }
});

// Submit on Ctrl+Enter in modal
modalInputArea.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        submitInputBtn.click();
    }
});

// Welcome message
console.log('%c🚀 CodeX Professional IDE Ready!', 'color: #6366f1; font-size: 24px; font-weight: bold;');
console.log('%c✨ Press Ctrl+Enter to run code', 'color: #8b5cf6; font-size: 14px;');
console.log('%c💡 Input popup appears automatically when needed!', 'color: #10b981; font-size: 14px;');