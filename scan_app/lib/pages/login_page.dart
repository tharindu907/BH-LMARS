import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:http/http.dart' as http;
import 'dart:convert'; // For JSON encoding/decoding
import 'package:scan_app/provider/login_provider.dart';

class LoginPage extends StatelessWidget {
  const LoginPage({super.key});

  // Function to handle login
  Future<void> handleLogin(BuildContext context) async {
    final loginProvider = context.read<LoginProvider>();

    final url = Uri.parse('http://192.168.8.100:5000/login'); 

    try {
      // Sending the POST request to the backend for username/password validation
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'username': loginProvider.username,
          'password': loginProvider.password,
        }),
      );

      if (response.statusCode == 200) {
        // Check if the widget is still mounted before using the context
        if (!context.mounted) return; // Added check for mounted
        // Login successful, navigate to the next page
        Navigator.of(context).pushReplacementNamed('/home'); // Update with the correct route
      } else {
        // Check if the widget is still mounted before showing SnackBar
        if (!context.mounted) return; // Added check for mounted
        // Login failed, show error message
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Login failed: ${response.body}')),
        );
      }
    } catch (error) {
      // Check if the widget is still mounted before showing SnackBar
      if (!context.mounted) return; // Added check for mounted
      // Handle connection errors
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Error connecting to the server')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: SizedBox(
          height: MediaQuery.of(context).size.height,
          child: Padding(
            padding: const EdgeInsets.all(24),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                const Spacer(),
                const Text(
                  'Welcome to Scan App',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 22,
                    fontWeight: FontWeight.bold,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 16),
                // Add the logo image
                Image.asset(
                  'assets/images/logo.jpeg',
                  height: 200, // Adjust height
                ),
                const SizedBox(height: 16),
                const Text(
                  'Login to continue',
                  style: TextStyle(
                    color: Colors.white,
                  ),
                  textAlign: TextAlign.center,
                ),
                const Spacer(),
                // Username input
                TextField(
                  onChanged: (value) {
                    context.read<LoginProvider>().username = value;
                  },
                  decoration: InputDecoration(
                    hintText: 'Username',
                    border: const OutlineInputBorder(
                      borderRadius: BorderRadius.all(Radius.circular(12)),
                    ),
                    filled: true,
                    fillColor: Colors.white.withOpacity(0.5),
                  ),
                ),
                const SizedBox(height: 16),
                // Password input
                TextField(
                  onChanged: (value) {
                    context.read<LoginProvider>().password = value;
                  },
                  decoration: InputDecoration(
                    hintText: 'Password',
                    border: const OutlineInputBorder(
                      borderRadius: BorderRadius.all(Radius.circular(12)),
                    ),
                    filled: true,
                    fillColor: Colors.white.withOpacity(0.5),
                  ),
                  obscureText: true,
                ),
                const SizedBox(height: 32),
                SizedBox(
                  height: 48,
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: () => handleLogin(context), // Call the login handler
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.amber,
                      foregroundColor: Colors.black,
                    ),
                    child: const Text('Login'),
                  ),
                ),
                const Spacer(),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
