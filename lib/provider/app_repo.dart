import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:scan_app/data/model/user.dart';
import 'package:web_socket_channel/web_socket_channel.dart';

class AppRepo extends ChangeNotifier {
  String? _token;
  User? user;
  WebSocketChannel? _channel;

  // Getter for the token
  String? get token => _token;

  // Setter for the token
  set token(String? value) {
    if (_token != value) {
      _token = value;
      _connectSocket();
    }
  }

  // Connect to WebSocket and handle messages
  void _connectSocket() {
    // Close previous channel if it exists
    _channel?.sink.close();

    // Only connect if the token is not null
    if (_token != null) {
      final wsUrl = Uri.parse('ws://localhost:8080/ws?token=$_token');
      _channel = WebSocketChannel.connect(wsUrl);

      _channel?.stream.listen(
        (message) {
          // Handle incoming messages here if needed
          try {
            // Assuming you might handle some JSON data here
            final data = jsonDecode(message);
            // Process data as required
            print('Received message: $data');
          } catch (e) {
            // Handle JSON parsing or other errors here
            print('Error parsing message: $e');
          }
        },
        onError: (error) {
          // Handle WebSocket errors here
          print('WebSocket error: $error');
        },
        onDone: () {
          // Handle WebSocket disconnection here
          print('WebSocket connection closed');
        },
      );
    }
  }

  // Clean up resources when not needed
  @override
  void dispose() {
    _channel?.sink.close();
    super.dispose();
  }
}
