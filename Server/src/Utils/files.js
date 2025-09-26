const val = {
  _id: new ObjectId('68a37d9572c79782143ded4d'),
  title: 'Check if a String is a Palindrome',
  description: 'Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.',
  difficulty: 'easy',
  tags: [ [ 'string, two-pointers' ] ],
  visibleTestCases: [
    {
      input: 'A man, a plan, a canal: Panama',
      output: 'true',
      explanation: "Ignoring non-alphanumeric characters and cases, the string reads 'amanaplanacanalpanama', which is a palindrome.",
      _id: new ObjectId('68a37d9572c79782143ded4e')
    },
    {
      input: 'race a car',
      output: 'false',
      explanation: "Ignoring non-alphanumeric characters, the string reads 'raceacar', which is not a palindrome.",
      _id: new ObjectId('68a37d9572c79782143ded4f')
    }
  ],
  startCode: [
    {
      language: 'C++',
      intialCode: 'class Solution {\n' +
        'public:\n' +
        '    bool isPalindrome(string s) {\n' +
        '        \n' +
        '    }\n' +
        '};',
      _id: new ObjectId('68a37d9572c79782143ded52')
    },
    {
      language: 'Java',
      intialCode: 'class Solution {\n' +
        '    public boolean isPalindrome(String s) {\n' +
        '        \n' +
        '    }\n' +
        '}',
      _id: new ObjectId('68a37d9572c79782143ded53')
    },
    {
      language: 'JavaScript',
      intialCode: 'function isPalindrome(s) {\n    \n}\nmodule.exports = isPalindrome;',     
      _id: new ObjectId('68a37d9572c79782143ded54')
    }
  ],
  referenceSolution: [
    {
      language: 'C++',
      completeCode: '#include <iostream>\n' +
        '#include <string>\n' +
        '#include <cctype>\n' +
        'using namespace std;\n' +
        'class Solution {\n' +
        'public:\n' +
        '    bool isPalindrome(string s) {\n' +
        '        int left = 0, right = s.size() - 1;\n' +
        '        while (left < right) {\n' +
        '            while (left < right && !isalnum(s[left])) left++;\n' +
        '            while (left < right && !isalnum(s[right])) right--;\n' +
        '            if (tolower(s[left]) != tolower(s[right])) return false;\n' +
        '            left++; right--;\n' +
        '        }\n' +
        '        return true;\n' +
        '    }\n' +
        '};\n' +
        'int main(){\n' +
        '    Solution sol;\n' +
        '    string input;\n' +
        '    getline(cin, input);\n' +
        '    cout << (sol.isPalindrome(input) ? "true" : "false");\n' +
        '    return 0;\n' +
        '}',
      _id: new ObjectId('68a37d9572c79782143ded55')
    },
    {
      language: 'Java',
      completeCode: 'import java.util.*;\n' +
        'public class Main {\n' +
        '    public static boolean isPalindrome(String s) {\n' +
        '        int left = 0, right = s.length() - 1;\n' +
        '        while (left < right) {\n' +
        '            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;\n' +
        '            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;\n' +
        '            if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) return false;\n' +
        '            left++; right--;\n' +
        '        }\n' +
        '        return true;\n' +
        '    }\n' +
        '    public static void main(String[] args) {\n' +
        '        Scanner sc = new Scanner(System.in);\n' +
        '        String input = sc.nextLine();\n' +
        '        System.out.print(isPalindrome(input) ? "true" : "false");\n' +
        '    }\n' +
        '}',
      _id: new ObjectId('68a37d9572c79782143ded56')
    },
    {
      language: 'JavaScript',
      completeCode: 'function isPalindrome(s) {\n' +
        '    let left = 0, right = s.length - 1;\n' +
        '    while (left < right) {\n' +
        '        while (left < right && !/[a-z0-9]/i.test(s[left])) left++;\n' +
        '        while (left < right && !/[a-z0-9]/i.test(s[right])) right--;\n' +
        '        if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;\n' +    
        '        left++; right--;\n' +
        '    }\n' +
        '    return true;\n' +
        '}\n' +
        "const readline = require('readline');\n" +
        'const rl = readline.createInterface({ input: process.stdin, output: process.stdout });\n' +
        "let input = '';\n" +
        "rl.on('line', (line) => { input = line; }).on('close', () => { console.log(isPalindrome(input) ? 'true' : 'false'); });",
      _id: new ObjectId('68a37d9572c79782143ded57')
    }
  ]
}