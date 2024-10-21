import 'package:http/http.dart' as http;
import 'dart:convert'; // For JSON encoding/decoding
import 'package:logger/logger.dart'; // Import the logger package

class LoginService {
  final String username;
  final String password;
  final Logger _logger = Logger(); // Create a logger instance

  LoginService({required this.username, required this.password});

  Future<Map<String, dynamic>> login() async {
    final url = Uri.parse('http://localhost:5000/login'); // Use localhost

    try {
      // Send POST request with username and password
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'username': username,
          'password': password,
        }),
      );

      // Check if the request was successful
      if (response.statusCode == 200) {
        // Parse the response body
        final data = jsonDecode(response.body);
        return {'status': 'success', 'token': data['token']}; // Assuming your API returns a token
      } else {
        // Return error status with message from the response
        return {'status': 'error', 'message': response.body};
      }
    } catch (e) {
      // Handle any errors (like network issues)
      _logger.e('Login failed: $e'); // Log the error message
      return {'status': 'error', 'message': 'An error occurred while connecting to the server'};
    }
  }
}
