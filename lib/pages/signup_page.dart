import 'package:flutter/material.dart';

class SignUpPage extends StatelessWidget {
  SignUpPage({super.key});

  @override
  Widget build(BuildContext context) {
    // Create TextEditingControllers to manage the input values
    final TextEditingController usernameController = TextEditingController();
    final TextEditingController passwordController = TextEditingController();

    return Scaffold(
      appBar: AppBar(
        title: Text('Sign Up'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Username input
            TextField(
              controller: usernameController,
              decoration: InputDecoration(
                hintText: 'Username',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.all(Radius.circular(12)),
                ),
                filled: true,
                fillColor: Colors.white.withOpacity(0.5),
              ),
            ),
            SizedBox(height: 16),
            // Password input
            TextField(
              controller: passwordController,
              decoration: InputDecoration(
                hintText: 'Password',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.all(Radius.circular(12)),
                ),
                filled: true,
                fillColor: Colors.white.withOpacity(0.5),
              ),
              obscureText: true,
            ),
            SizedBox(height: 32),
            SizedBox(
              height: 48,
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () {
                  // Placeholder action, no actual sign-up functionality
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('Sign Up button clicked (placeholder)')),
                  );

                  Navigator.pop(context); // Go back to the previous page
                },
                child: Text('Create Account'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
