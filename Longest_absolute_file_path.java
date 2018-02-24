/*
Leet Code question
Suppose we abstract our file system by a string in the following manner:

The string "dir\n\tsubdir1\n\tsubdir2\n\t\tfile.ext" represents:

dir
    subdir1
    subdir2
        file.ext
The directory dir contains an empty sub-directory subdir1 and a sub-directory subdir2 containing a file file.ext.

The string "dir\n\tsubdir1\n\t\tfile1.ext\n\t\tsubsubdir1\n\tsubdir2\n\t\tsubsubdir2\n\t\t\tfile2.ext" represents:

dir
    subdir1
        file1.ext
        subsubdir1
    subdir2
        subsubdir2
            file2.ext
The directory dir contains two sub-directories subdir1 and subdir2. subdir1 contains a file file1.ext and an empty second-level sub-directory subsubdir1. subdir2 contains a second-level sub-directory subsubdir2 containing a file file2.ext.

We are interested in finding the longest (number of characters) absolute path to a file within our file system. For example, in the second example above, the longest absolute path is "dir/subdir2/subsubdir2/file2.ext", and its length is 32 (not including the double quotes).

Given a string representing the file system in the above format, return the length of the longest absolute path to file in the abstracted file system. If there is no file in the system, return 0.

Note:
The name of a file contains at least a . and an extension.
The name of a directory or sub-directory will not contain a ..
Time complexity required: O(n) where n is the size of the input string.

Notice that a/aa/aaa/file1.txt is not the longest file path, if there is another path aaaaaaaaaaaaaaaaaaaaa/sth.png.
*/
class Solution {
  /*
  Strategy is to create a Hashmap
  */
    public int lengthLongestPath(String input) {

        int res = 0;
        Map<Integer, Integer> m = new HashMap<>();
        // start with level 0 = 0 (value)
        m.put(0, 0);
        //split the string by "\n" for levels
        for (String s : input.split("\n")) {
          // int level is decided by "/t"
            int level = s.lastIndexOf("\t") + 1;
            // len is just length of that folder/filename
            int len = s.substring(level).length();
            // IF string contains a "." which means it must be file name. Put res = (that file name)
            // Math.max find largest value between given arguemnts(a,b), so in this res = file1.txt which is 12(I blieve), but in the loop when it goes to final level res will be 32, so FINAL value will be 32. LOOK UP MATH.MAX for explanation
             if (s.contains(".")) {
                res = Math.max(res, m.get(level) + len);
            } else {// just adds level and corresponding length
                m.put(level + 1, m.get(level) + len + 1);
            }
        }
        /* RUN FOLLOWING CODE TO CHECK OUTPUT OF EVERY LEVEL

        for (m.Entry<String,String> entry : m.entrySet()) {
  String key = entry.getKey();
  String value = entry.getValue();
  System.out.println(key + " and " +value);

}
*/


        return res;
    }
}
