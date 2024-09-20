import 'package:flutter/material.dart';
import 'package:scan_app/data/model/user.dart';
import 'package:scan_app/data/service/get_all_user_service.dart';

class UserProvider extends ChangeNotifier {
  Future<List<User>> getAllUser() async {
    return await GetAllUserService().call();
  }
}