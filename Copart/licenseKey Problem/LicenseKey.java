import java.util.Scanner;

public class LicenseKey {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Scanner in = new Scanner(System.in);
		System.out.println("Enter the String");
		String inputKey = in.nextLine();
		if (inputKey != null && !inputKey.isEmpty()) 
		{
			System.out.println("Enter the value of K");
			int k = Integer.parseInt(in.nextLine());
			// convert to upper case and remove -'s
			inputKey = inputKey.toUpperCase();
			inputKey = inputKey.replace("-", "");
			if(k==0)
			{
				System.out.println(inputKey);
				return;
			}
			else if(k<0)
			{
				System.out.println("Invalid k");
				return;
			}
			String output = "";
			int i = inputKey.length();
			// parse the string from end and consider a substring of size k, with every iteration appending the formatted key at the end.
			while (i > 0)
			{
				if (i - k >= 0) 
				{
					if (!output.isEmpty())
						output = inputKey.substring(i - k, i) + "-" + output;
					else
						output = inputKey.substring(i - k, i);

				}
				else
				{
					output = inputKey.substring(0, i) + "-" + output;
				}
				i = i - k;
			}
			System.out.println(output);
		}
		else
		{
			System.out.println("Invalid String");	
		}
	}

}
