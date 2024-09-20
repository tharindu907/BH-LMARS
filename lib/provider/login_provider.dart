// login_provider.dart
//class LoginProvider extends ChangeNotifier {
  //var username = '';
  //var password = '';

  //Future<void> login() async {
    // Simulate a login request
    //final response = await LoginService(username, password).call();
    
    //if (response != null) {
      // Assume response contains user and token
      //final user = response.user;
      //final token = response.token;
      
      // Update AppRepo with user and token
      //final appRepo = Provider.of<AppRepo>(context, listen: false);
      //appRepo.user = user;
      //appRepo.token = token;
      
      // Notify listeners or handle navigation
      //notifyListeners();
    //}
  //}
//}


// lib/provider/login_provider.dart
import 'package:flutter/material.dart';
import 'package:scan_app/data/service/login_service.dart';

class LoginProvider extends ChangeNotifier {
  String _username = '';
  String _password = '';
  bool _isLoading = false;

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
        // Store the token or any other necessary data
        // Example: _token = result['token'];
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
      print('Login failed: $e');
      return false;
    }
  }
}

