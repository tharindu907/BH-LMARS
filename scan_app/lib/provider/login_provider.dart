import 'package:flutter/material.dart';
import 'package:scan_app/data/service/login_service.dart';
import 'package:logger/logger.dart';

class LoginProvider extends ChangeNotifier {
  String _username = '';
  String _password = '';
  bool _isLoading = false;
  final Logger _logger = Logger(); // Initialize the logger

  String get username => _username;
  String get password => _password;
  bool get isLoading => _isLoading;

  set username(String value) {
    _username = value;
    notifyListeners();
  }

  set password(String value) {
    _password = value;
    notifyListeners();
  }

  Future<bool> login() async {
    _isLoading = true;
    notifyListeners();

    try {
      final loginService = LoginService(username: _username, password: _password);
      final result = await loginService.login();

      if (result['status'] == 'success') {
        _isLoading = false;
        notifyListeners();
        return true;
      } else {
        _isLoading = false;
        notifyListeners();
        return false;
      }
    } catch (e) {
      _isLoading = false;
      notifyListeners();
      _logger.e('Login failed: $e'); // Use logger to log the error
      return false;
    }
  }
}
