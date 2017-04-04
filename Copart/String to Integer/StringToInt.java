import java.util.Scanner;

public class StringToInt {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Scanner in = new Scanner(System.in);
		System.out.println("Enter the String");
		String input = in.nextLine();
		 int output = 0;
		 int multfactor = 1;
		 // iterate from the last char/digit in the input and traversing to the start
		 //input.charAt(i)-'0' gives the exact value of the character in the string else it would give the ascii value
		 for (int i = input.length()-1; i >= 0; i--) 
		 {
			 output += (int)(input.charAt(i)-'0')*multfactor;
		     multfactor *= 10;
		}
		 System.out.println(output);  

	}

}
