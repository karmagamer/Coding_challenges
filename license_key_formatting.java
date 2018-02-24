class Solution {
    static String licenseKeyFormatting(String S, int K) {

// **** remove ‘-‘s and convert to UPPER case ****

S = S.replaceAll("-","");

S = S.toUpperCase();

// **** compute leading number of characters ****

int leading = S.length() % K;

String license = S.substring(0, leading);

// **** loop appending rest of license ****
// add int k to get next sub string
// add - before returning license String
  for (int i = leading; i < S.length(); i += K)
        {
              if (i != 0){
              license += "-";
            }
              license += S.substring(i, i + K);

        }

// **** ****

return license;

}
}
